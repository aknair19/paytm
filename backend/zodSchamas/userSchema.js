import * as z from "zod";

export const signUpSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  firstName: z.string(),
  lastName: z.string(),
});
