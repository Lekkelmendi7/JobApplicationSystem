const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

// import routes
const authRoutes = require('./routes/authRoutes');

// Database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

// Routes Middleware
app.use('/api', authRoutes);

// Error middleware
app.use(errorHandler);

// Port
const port = process.env.PORT || 9000;

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
