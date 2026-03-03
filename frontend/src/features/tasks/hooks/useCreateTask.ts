import { createTask } from "@/services/api/tasks";
import { useMutation } from "@tanstack/react-query";
import type { CreateTaskInput, Task } from "../types";
import type { ApiResponse } from "@/types/api-types";

export default function useCreateTask() {
  const { isPending: isCreating, mutateAsync } = useMutation<
    ApiResponse<{ task: Task }>,
    Error,
    CreateTaskInput
  >({
    mutationFn: (formdata) => createTask(formdata),
  });

  return { isCreating, mutateAsync };
}
