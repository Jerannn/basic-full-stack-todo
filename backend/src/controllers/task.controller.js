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
  const now = new Date();

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  const tasks = await Task.getTodayTasks(req.user.id, start, end);

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});

export const getTomorrowTasks = catchAsync(async (req, res, next) => {
  const today = new Date();

  const start = new Date(today);
  start.setDate(start.getDate() + 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(today);
  end.setDate(end.getDate() + 2);
  end.setHours(0, 0, 0, 0);

  const tasks = await Task.getTomorrowTasks(req.user.id, start, end);

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});

export const getWeekTasks = catchAsync(async (req, res, next) => {
  const today = new Date();

  const start = new Date(today);
  start.setHours(0, 0, 0, 0);

  const end = new Date(today);
  end.setDate(end.getDate() + 7);
  end.setHours(0, 0, 0, 0);

  const tasks = await Task.getWeekTasks(req.user.id, start, end);

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});
