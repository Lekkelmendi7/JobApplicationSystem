const express = require('express');
const { signup, signin, logout, userProfile } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

class AuthRouter {
    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post('/signup', signup);
        this.router.post('/signin', signin);
        this.router.get('/logout', logout);
        this.router.get('/me', isAuthenticated, userProfile);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = AuthRouter;