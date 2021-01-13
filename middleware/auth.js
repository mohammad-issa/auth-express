const UserSchema = require('../models/UserSchema');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

async function protect(req, res, next) {

    const token = req.headers.authorization;
    if (!token) {
        return next(new ErrorResponse('unauthorized', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserSchema.findById(decoded.id);

        next();

    } catch(error) {
        return next(new ErrorResponse('unauthorized', 401));
    }
}

module.exports = {
    protect,
}
