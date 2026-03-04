import { getTodayTasks } from "@/services/api/tasks";
import type { ApiResponse } from "@/types/api-types";
import { useQuery } from "@tanstack/react-query";
import type { Task } from "../types";

export default function useTodayTasks() {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery<ApiResponse<{ tasks: Task[] }>, Error, Task[]>({
    queryFn: getTodayTasks,
    queryKey: ["tasks-today"],
    select: (response) => response.data.tasks,
  });
  return { tasks, isLoading, isError };
}
