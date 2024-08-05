import * as z from "zod";

export const signUpSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  firstName: z.string(),
  lastName: z.string(),
});

export const signinSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

export const updateSchema = z.object({
  password: z.string().min(6).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().email().optional(),
});
