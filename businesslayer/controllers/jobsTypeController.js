const JobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/errorResponse');

class JobTypeController {
  static getInstance() {
    if (!JobTypeController.instance) {
      JobTypeController.instance = new JobTypeController();
    }
    return JobTypeController.instance;
  }

  async createJobType(req, res, next) {
    try {
      const jobT = await JobType.create({
        jobTypeName: req.body.jobTypeName,
        user: req.user.id
      });
      res.status(201).json({
        success: true,
        jobT
      });
    } catch (error) {
      next(error);
    }
  }

  async allJobsType(req, res, next) {
    try {
      const jobT = await JobType.find();
      res.status(200).json({
        success: true,
        jobT
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobTypeById(req, res, next) {
    try {
      const jobT = await JobType.findById(req.params.id);
      if (!jobT) {
        return next(new ErrorResponse("Job type not found", 404));
      }
  
      res.status(200).json({
        success: true,
        jobT
      });
    } catch (error) {
      next(error);
    }
  }
  

  async updateJobType(req, res, next) {
    try {
      const jobT = await JobType.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({
        success: true,
        jobT
      });
    } catch (error) {
      next(error);
    }
  }
  

  async deleteJobType(req, res, next) {
    try {
      const jobT = await JobType.findByIdAndRemove(req.params.type_id);
      res.status(200).json({
        success: true,
        message: "Job type deleted"
      });
    } catch (error) {
      next(new ErrorResponse("server error", 500));
    }
  }
}

module.exports = JobTypeController;