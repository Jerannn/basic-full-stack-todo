import type { Task } from "@/features/tasks/types";
import api from "@/lib/axios";
import type { ApiResponse } from "@/types/api-types";

export const createTask = async (
  formdata: Task,
): Promise<ApiResponse<{ task: Task }>> => {
  return api.post("/tasks", formdata);
};
