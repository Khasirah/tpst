import {z} from "zod";

export const inputSuratSchema = z.object({
  id: z.string(),
  nomorSurat: z.string().min(2),
  pengirim: z.string().min(3),
  perihal: z.string().min(3),
  bidang: z.string(),
  ekspedisi: z.string(),
  noResi: z.string().optional(),
  kontak: z.string().optional(),
  createdDate: z.date(),
  namaBerkas: z.instanceof(FileList).optional(),
  petugasTpst: z.string()
})

export type InputSuratField = z.infer<typeof inputSuratSchema>