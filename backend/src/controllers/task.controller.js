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
    Object.assign(result.data, { user_id: req.user.id }),
  );

  res.status(201).json({
    status: "success",
    data: {
      task: newTask,
    },
  });
});
