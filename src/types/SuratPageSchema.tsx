import {z} from "zod";

const suratPageSchema = z.object({
  berkas: z.instanceof(FileList).optional()
});

export {suratPageSchema}