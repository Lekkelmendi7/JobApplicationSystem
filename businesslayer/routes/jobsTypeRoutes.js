const express = require('express');
const JobTypeController = require('../controllers/jobsTypeController');

class JobTypeRoutes {
  constructor() {
    this.router = express.Router();
    this.init();
  }

  init() {
    const jobTypeController = new JobTypeController(); // create an instance
    this.router.get('/', jobTypeController.allJobsType);
    this.router.get('/:id', jobTypeController.getJobTypeById);
    this.router.post('/', jobTypeController.createJobType);
    this.router.put('/:type_id', jobTypeController.updateJobType);
    this.router.delete('/:type_id', jobTypeController.deleteJobType);
  }
}

module.exports = JobTypeRoutes;