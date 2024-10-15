import {z} from "zod";

export const tandaTerimaSchema = z.object({
  tahun: z.string()
    .regex(/^\d+$/, "hanya boleh angka")
})

export type TandaTerimaField = z.infer<typeof tandaTerimaSchema>