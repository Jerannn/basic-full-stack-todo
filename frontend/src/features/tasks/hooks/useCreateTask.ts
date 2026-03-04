import { createTask } from "@/services/api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTaskInput, Task } from "../types";
import type { ApiResponse } from "@/types/api-types";

export default function useCreateTask() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutateAsync } = useMutation<
    ApiResponse<{ task: Task }>,
    Error,
    CreateTaskInput
  >({
    mutationFn: (formdata) => createTask(formdata),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          ["tasks-today", "tasks-tomorrow"].includes(
            query.queryKey[0] as string,
          ),
      });
    },
  });

  return { isCreating, mutateAsync };
}
