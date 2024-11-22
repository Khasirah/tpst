import {z} from "zod";

export const addUserSchema = z.object({
  idUser: z.string().min(9).max(9),
  namaUser: z.string().min(3),
  idBagian: z.number().positive(),
  idKelompok: z.number().positive()
})