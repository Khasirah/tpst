import {z} from "zod";
import {ErrorMessages} from "@/model/ErrorMessages.tsx";

export const uploadUserSchema = z.object({
  csvFile: z.instanceof(FileList)
    .refine((file) =>
      file?.length == 1, ErrorMessages.fileNotCSV)
    .refine(file => file?.item(0)?.type == "text/csv", ErrorMessages.fileNotCSV)
})