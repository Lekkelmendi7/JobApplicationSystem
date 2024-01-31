const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

const AuthController = {
  signup(req, res, next) {
    const { email } = req.body;
    const userExist = User.findOne({ email });
    if (userExist) {
      return next(new ErrorResponse("E-mail already registred", 400));
    }
    try {
      const user = User.create(req.body);
      res.status(201).json({
        success: true,
        user
      })
    } catch (error) {
      next(error);
    }
  },

  signin(req, res, next) {
    try {
      const { email, password } = req.body;
      //validation
      if (!email) {
        return next(new ErrorResponse("please add an email", 403));
      }
      if (!password) {
        return next(new ErrorResponse("please add a password", 403));
      }

      //check user email
      const user = User.findOne({ email });
      if (!user) {
        return next(new ErrorResponse("invalid credentials", 400));
      }
      //check password
      const isMatched = user.comparePassword(password);
      if (!isMatched) {
        return next(new ErrorResponse("invalid credentials", 400));
      }

      this.sendTokenResponse(user, 200, res);

    } catch (error) {
      next(error);
    }
  },

  sendTokenResponse(user, codeStatus, res) {
    const token = user.getJwtToken();
    res 
      .status(codeStatus)
      .cookie('token', token, {maxAge: 60 * 60 * 1000, httpOnly: true })
      .json({ success: true, token, user })
  },

  logout(req, res, next) {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
  },

  userProfile(req, res, next) {
    const user = User.findById(req.user.id).select('-password');
    res.status(200).json({
        success: true,
        user
    })
  }
};

module.exports = AuthController;