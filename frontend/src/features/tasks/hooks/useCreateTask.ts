import { createTask } from "@/services/api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTaskInput } from "../types";

export default function useCreateTask() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutateAsync } = useMutation({
    mutationFn: (formdata: CreateTaskInput) => createTask(formdata),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          ["tasks-today", "tasks-tomorrow", "tasks-week"].includes(
            query.queryKey[0] as string,
          ),
      });
    },
  });

  return { isCreating, mutateAsync };
}
