const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // CastError - bad ID
  if (error.name === 'CastError') {
    const message = `not found with ID of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // 11000 - already exisit
  if (error.code === 11000) {
    const message = 'already exisit';
    error = new ErrorResponse(message, 400);
  }

  // Validation errors
  if (error.name === 'ValidationError') {
    error = new ErrorResponse('validator error', 400);
  }
  

  res.status(error.statusCode || 500).json({
		sucess: false,
		message: error.message || 'Server Error',
	});
}

module.exports = errorHandler;
