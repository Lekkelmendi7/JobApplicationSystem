const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {

    let error = {...err};
    error.message = err.message;

    if(err.name === "CastError"){
        const message = `Resource not found ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    //Mongoose vlere e dublifikuar
    if(err.code === 11000){
        const message = "Duplicate value entered";
        error = new ErrorResponse(message, 400);
    }

    //Mongoose error i validimit
    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map(val => '' + val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.codeStatus || 500).json({
        success: false,
        error: error.message || "server error"
    })
}

module.exports = errorHandler;