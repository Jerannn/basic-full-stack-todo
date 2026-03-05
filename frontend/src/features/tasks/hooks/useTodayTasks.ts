import { getTodayTasks } from "@/services/api/tasks";
import { useQuery } from "@tanstack/react-query";

export default function useTodayTasks() {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getTodayTasks,
    queryKey: ["tasks-today"],
    select: (response) => response.data.tasks,
  });
  return { tasks, isLoading, isError };
}
