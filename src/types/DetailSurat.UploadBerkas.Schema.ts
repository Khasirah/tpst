import {z} from "zod";
import {ErrorMessages} from "@/model/ErrorMessages.tsx";

export const detailSuratUploadBerkasSchema = z.object({
  pdfFile: z.instanceof(FileList)
    .refine(file =>
    file?.length == 1, ErrorMessages.fileNotPdf)
    .refine(file =>
    file?.item(0)?.type == "application/pdf", ErrorMessages.fileNotPdf)
})