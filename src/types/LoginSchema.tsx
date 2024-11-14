import {z} from "zod";

export const loginSchema = z.object({
  idUser: z.string()
    .regex(/^\d+$/, "hanya boleh angka")
    .min(9, {message: "minimal 9 angka"})
    .max(9, {message: "maksimal 9 angka"}),
  password: z.string()
})

export type LoginField = z.infer<typeof loginSchema>