import { z } from "zod";

export const signupSchema = z.object({
  name: z.string("Name is required"),
  email: z.email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
