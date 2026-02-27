import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { signupSchema } from "../validations/auth.validation.js";
import { ENV } from "../config/env.js";

const generateToken = (id) =>
  jwt.sign({ id }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = generateToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + ENV.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (ENV.NODE_ENV === "production") cookieOptions.secure = true;

  res.status(statusCode).cookie("jwt", token, cookieOptions);

  // remove password from response
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const newUser = await User.create(result.data);

  createSendToken(newUser, 201, res);
});

export const signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findByEmail(email);

  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  if (!user || !(await User.verifyPassword(password, user.password))) {
    return next(new AppError("Incorrect email and password", 400));
  }

  createSendToken(user, 200, res);
});

export const protect = async (req, res, next) => {
  let token;
  console.log(req.cookies);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401),
    );
  }

  const decoded = await promisify(jwt.verify)(token, ENV.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists", 401),
    );
  }

  req.user = currentUser;
  next();
};

export const getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Successfully fetched ME",
  });
});
