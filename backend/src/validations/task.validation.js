import z from "zod";

export const createTaskSchema = z.object({
  title: z.string("Title is required"),
  description: z.string().trim().optional(),
  category: z.string("Category is required"),
  dueDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : null)),
});
