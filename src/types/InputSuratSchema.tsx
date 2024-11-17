import {z} from "zod";

export const inputSuratSchema = z.object({
  nomorSurat: z.string().min(2),
  pengirim: z.string().min(3),
  perihal: z.string().min(3),
  ekspedisi: z.number().positive(),
  noResi: z.string().optional(),
  kontak: z.string().optional(),
  bidang: z.number().positive(),
  berkas: z.instanceof(FileList).optional(),
})

export type InputSuratField = z.infer<typeof inputSuratSchema>