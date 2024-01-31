const ErrorResponse = require('../utils/errorResponse');

class ErrorHandler {
  constructor(err, req, res, next) {
    this.err = err;
    this.req = req;
    this.res = res;
    this.next = next;
  }

  handleError() {
    let error = { ...this.err };
    error.message = this.err.message;

    if (this.err.name === 'CastError') {
      const message = `Resource not found ${this.err.value}`;
      error = new ErrorResponse(message, 404);
    }

    if (this.err.code === 11000) {
      const message = 'Duplicate value entered';
      error = new ErrorResponse(message, 400);
    }

    if (this.err.name === 'ValidationError') {
      const message = Object.values(this.err.errors).map(val => '' + val.message);
      error = new ErrorResponse(message, 400);
    }

    this.res.status(error.codeStatus || 500).json({
      success: false,
      error: error.message || 'server error'
    });
  }
}

module.exports = ErrorHandler;