const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

class Authentication {
  static async isAuthenticated(req, res, next) {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id); // Await the result
      next();
    } catch (error) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }
  }

  static isAdmin(req, res, next) {
    if (req.user.role === 0) {
      return next(new ErrorResponse('Access denied, you must be an admin', 401));
    }
    next();
  }
}

module.exports = Authentication;