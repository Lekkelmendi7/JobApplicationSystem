const express = require('express');
const JobsController = require('../controllers/jobsController');

class JobRoutes {
  constructor() {
    this.router = express.Router();
    this.init();
  }

  init() {
    this.router.get('/', JobsController.showJobs);
    this.router.get('/:id', JobsController.singleJob);
    this.router.post('/', JobsController.createJob);
    this.router.put('/:id', JobsController.updateJob);
    this.router.delete('/:id', JobsController.deleteJob);
  }
}

module.exports = JobRoutes;