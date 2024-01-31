const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

class UserRoutes {
  constructor() {
    this.router = express.Router();
    this.init();
  }

  init() {
    this.router.get('/', UserController.allUsers);
    this.router.get('/:id', UserController.singleUser);
    this.router.post('/', UserController.createUser);
    this.router.put('/:id', UserController.editUser);
    this.router.delete('/:id', UserController.deleteUser);
  }
}

module.exports = UserRoutes;