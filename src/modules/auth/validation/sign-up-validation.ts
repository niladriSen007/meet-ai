import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name must be at least 1 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password must be at least 1 characters" }),
  confirmPassword: z.string().min(1, { message: "Confirm password must be at least 1 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})