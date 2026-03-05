import { getTomorrowTasks } from "@/services/api/tasks";
import { useQuery } from "@tanstack/react-query";

export default function useTomorrowTasks() {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getTomorrowTasks,
    queryKey: ["tasks-tomorrow"],
    select: (response) => response.data.tasks,
  });
  return { tasks, isLoading, isError };
}
