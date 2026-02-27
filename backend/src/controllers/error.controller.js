import AppError from "../utils/appError.js";

const handelUniqueError = (err) => {
  const field = err.constraint.split("_")[1];
  const message = `This ${field} already exists`;

  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

export default function errorController(err, req, res, next) {
  const nodeEnv = process.env.NODE_ENV;
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (nodeEnv === "development") {
    sendErrorDev(err, res);
  } else if (nodeEnv === "production") {
    let error = { ...err, message: err.message };

    if (err.code === "23505") error = handelUniqueError(err);
    sendErrorProd(error, res);
  }
}
