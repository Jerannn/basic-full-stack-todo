import Task from "../models/task.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
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

export const getTodayTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.getTodayTasks(req.user.id);

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});

export const getTomorrowTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.getTomorrowTasks(req.user.id);

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});

export const getWeekTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.getWeekTasks(req.user.id);

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});
