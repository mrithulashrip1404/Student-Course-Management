
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack || err);

    let statusCode = err.statusCode || err.status || 500;
    let message = err.message || "Internal Server Error";
    let errors;

    if (err.code === 11000) {
        statusCode = 409;
        message = "Duplicate value already exists";
    } else if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Validation failed";
        errors = Object.values(err.errors).map(error => error.message);
    } else if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID or data format";
    }

    if (statusCode >= 500 && process.env.NODE_ENV === "production") {
        message = "Internal Server Error";
        errors = undefined;
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(errors && { errors })
    });
};

module.exports = errorMiddleware;
