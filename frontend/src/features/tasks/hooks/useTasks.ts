import { getTasks } from "@/services/api/tasks";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Pagination, Params, Task } from "../types";

type GetTasks = {
  tasks: Task[];
  pagination: Pagination;
  isLoading: boolean;
  isError: boolean;
};

export default function useTasks(params: Params): GetTasks {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getTasks(params),
    queryKey: ["tasks", params.page, params.limit],
    select: (res) => res.data,
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  });

  return {
    tasks: data?.tasks ?? [],
    pagination: data?.pagination || { totalPage: 0 },
    isLoading,
    isError,
  };
}
