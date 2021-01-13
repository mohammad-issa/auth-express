const UserSchema = require('../models/UserSchema');
const ErrorResponse = require('../utils/errorResponse');

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
 * Login user
 * @route   POST /api/auth/me
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
 * Get token from the model, create cookie ans send response
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

module.exports = {
    register,
    login,
    getMe,
};
