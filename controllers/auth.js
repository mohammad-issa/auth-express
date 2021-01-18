const UserSchema = require('../models/UserSchema');
const ErrorResponse = require('../utils/errorResponse');
const crypto = require('crypto');

/**
 * Get token from the model, create cookie and send response
 */
function sendTokenResponse(user, res) {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(200).cookie('token', token, options).json({
        success: true,
        token,
    });
}

/**
 * Create a new user
 * @route   POST /api/auth/register
 * @access  Public
*/
async function register (req, res, next) {
    try {
        const user = await UserSchema.create(req.body);

        sendTokenResponse(user, res);

    } catch (err) {
        next(err);
    }
};

/**
 * Login user
 * @route   POST /api/auth/login
 * @access  Public
*/
async function login (req, res, next) {
    try {
        const { email, password } = req.body;

        // validate email & password
        if (!email || !password) {
            return next(new ErrorResponse('please provide an email and password', 400));
        }

        // check for user
        const user = await UserSchema.findOne({ email }).select('+password');

        if (!user) {
            return next(new ErrorResponse('invalid credentials', 401));
        }

        // check if the password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse('invalid credentials', 401));
        }

        sendTokenResponse(user, res);

    } catch (err) {
        next(err);
    }
};

/**
 * Forget password
 * @route   POST /api/auth/forgetpassword
 * @access  Public
*/
async function forgetPassword (req, res, next) {
    try {
        const user = await UserSchema.findOne({ email: req.body.email });

        if (!user) {
            return next(new ErrorResponse('there is no user with that email', 404));
        }

        // generate and hash password token
        const resetToken = user.getResetPasswordToken();

        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset/${resetToken}`;
        console.log('resetUrl: ', resetUrl);

        userHashed = await UserSchema.findOneAndUpdate({ _id : user._id }, {
            resetPasswordToken: user.resetPasswordToken,
            resetPasswordExpire: user.resetPasswordExpire
        });

        res.status(200).json({
            success: true,
            message: 'url sent',
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Reset password
 * @route   PUT /api/auth/reset
 * @access  Public
*/
async function resetPassword (req, res, next) {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await UserSchema.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return next(new ErrorResponse('invalid', 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Get logged in user
 * @route   GET /api/auth/me
 * @access  Private
*/
async function getMe (req, res, next) {
    const user = await UserSchema.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
}

/**
 * Get user by ID
 * @route   GET /api/auth/user/:id
 * @access  Private
*/
async function getUserById (req, res, next) {
    const id = req.params.id;

    try {
        const user = await UserSchema.findById(id);
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return next(new ErrorResponse('no user found', 400));
    }
}

module.exports = {
    register,
    login,
    forgetPassword,
    resetPassword,
    getMe,
    getUserById,
};
