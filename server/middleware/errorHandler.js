import ErrorResponse from '../utils/ErrorResponse.js';

export const ErrorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  if (err.code === 11000) {
    const message = `username already exists. Please try another`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  console.log(`Error: `, error.message);

  res.status(error.statusCode || 500).json({
    message: error.message || 'Server Error',
  });
};
