import type {
  CreateTaskInput,
  Params,
  Task,
  TasksResponse,
} from "@/features/tasks/types";
import api from "@/lib/axios";
import type { ApiResponse } from "@/types/api-types";

export const createTask = async (
  formdata: CreateTaskInput,
): Promise<ApiResponse<{ task: Task }>> => {
  return api.post("/tasks", formdata);
};

export const getTasks = (
  params: Params,
): Promise<ApiResponse<TasksResponse>> => {
  return api.get("/tasks", {
    params,
  });
};

export const getTodayTasks = async (): Promise<ApiResponse<TasksResponse>> => {
  return api.get("/tasks/today");
};

export const getTomorrowTasks = async (): Promise<
  ApiResponse<TasksResponse>
> => {
  return api.get("/tasks/tomorrow");
};

export const getWeekTasks = async (): Promise<ApiResponse<TasksResponse>> => {
  return api.get("/tasks/week");
};
