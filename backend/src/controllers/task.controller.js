import Task from "../models/task.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import {
  getTodayDate,
  getTomorrowDate,
  getWeekDates,
} from "../utils/helper.js";
import { createTaskSchema } from "../validations/task.validation.js";

export const createTask = catchAsync(async (req, res, next) => {
  const result = createTaskSchema.safeParse(req.body);
  if (!result.success) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const newTask = await Task.create(
    Object.assign(result.data, { userId: req.user.id }),
  );

  res.status(201).json({
    status: "success",
    data: {
      task: newTask,
    },
  });
});

export const getTasks = catchAsync(async (req, res, next) => {
  const DEFAULT_LIMIT = 2;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || DEFAULT_LIMIT;
  const offset = (page - 1) * limit;
  console.log({ page, limit, offset });

  const tasks = await Task.findAll(req.user.id, offset, limit);
  const totalTasks = await Task.getCount(req.user.id);

  const totalPage = Math.ceil(totalTasks / limit);

  res.status(200).json({
    status: "success",
    data: {
      tasks,
      pagination: {
        totalPage,
      },
    },
  });
});

export const getTodayTasks = catchAsync(async (req, res, next) => {
  const [start, end] = getTodayDate();
  const tasks = await Task.getTodayTasks(req.user.id, start, end);

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});

export const getTomorrowTasks = catchAsync(async (req, res, next) => {
  const [start, end] = getTomorrowDate();
  const tasks = await Task.getTomorrowTasks(req.user.id, start, end);

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});

export const getWeekTasks = catchAsync(async (req, res, next) => {
  const [start, end] = getWeekDates();
  console.log(start, end);
  const tasks = await Task.getWeekTasks(req.user.id, start, end);

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});
