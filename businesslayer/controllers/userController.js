const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

class UserController {
  static async allUsers(req, res, next) {
    // enable pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    const users = await User.find().sort({ createdAt: -1 }).select('-password')
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      users,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
    next();
  }

  static async singleUser(req, res, next) {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
    next();
  }

  static async editUser(req, res, next) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
    next();
  }

  static async deleteUser(req, res, next) {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User deleted",
    });
    next();
  }

  static async createUser(req, res, next) {
    const { title, description, salary, location } = req.body;

    const currentUser = await User.findOne({ _id: req.user._id });

    if (!currentUser) {
      return next(new ErrorResponse("You must log in", 401));
    }

    const addJobHistory = {
      title,
      description,
      salary,
      location,
      user: req.user._id,
    };

    currentUser.jobsHistory.push(addJobHistory);
    await currentUser.save();

    res.status(200).json({
      success: true,
      currentUser,
    });
    next();
  }
}

module.exports = UserController;