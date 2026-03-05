import { getWeekTasks } from "@/services/api/tasks";
import { useQuery } from "@tanstack/react-query";

export default function useWeekTasks() {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getWeekTasks,
    queryKey: ["tasks-week"],
    select: (response) => response.data.tasks,
  });
  return { tasks, isLoading, isError };
}
