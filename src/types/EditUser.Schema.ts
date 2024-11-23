import {z} from "zod";

export const editUserSchema = z.object({
  idUser: z.string().min(9).max(9),
  namaUser: z.string().min(3),
  password: z.string().optional(),
  idBagian: z.string(),
  idKelompok: z.string()
})