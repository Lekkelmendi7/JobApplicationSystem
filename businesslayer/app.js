const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');

// Import the Database class
const Database = require('./database');
const db = new Database();

// Import the route classes
const UserRoutes = require('./routes/userRoutes');
const JobTypeRoutes = require('./routes/jobsTypeRoutes');
const JobRoutes = require('./routes/jobsRoutes');
const AuthRouter = require('./routes/authRoutes');

// Use the route classes
const userRoutes = new UserRoutes().router;
const authRouter = new AuthRouter().getRouter();
const jobTypeRoutes = new JobTypeRoutes().router;
const jobRoutes = new JobRoutes().router;


const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(cors());

// ROUTES MIDDLEWARE
app.use('/api', authRouter);
app.use('/api', userRoutes);
app.use('/api/jobtypes', jobTypeRoutes);
app.use('/api/jobs', jobRoutes);

// error middleware
app.use(errorHandler);

// PORT
const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});