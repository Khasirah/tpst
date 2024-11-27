import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ReloadIcon} from "@radix-ui/react-icons";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {detailSuratUploadBerkasSchema} from "@/types/DetailSurat.UploadBerkas.Schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {UploadIcon} from "lucide-react";

type DetailSuratUploadBerkasFormProps = {
  uploadHandler: (pdfFile: File) => void
}

function DetailSuratUploadBerkasForm(
  {
    uploadHandler
  }: DetailSuratUploadBerkasFormProps
) {
  const form = useForm<z.infer<typeof detailSuratUploadBerkasSchema>>({
    resolver: zodResolver(detailSuratUploadBerkasSchema)
  })
  const fileRef = form.register("pdfFile")

  function onSubmit(data: z.infer<typeof detailSuratUploadBerkasSchema>) {
    if (data.pdfFile.item(0) != null) {
      uploadHandler(data.pdfFile.item(0) as File)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-4">
          <FormField
            control={form.control}
            name="pdfFile"
            render={() => (
              <FormItem className={"max-w-sm"}>
                <FormLabel>Upload PDF</FormLabel>
                <FormControl>
                  <Input
                    type={"file"}
                    placeholder="pdf file"
                    {...fileRef}
                  />
                </FormControl>
                <FormDescription>
                  silahkan upload pdf file hasil scan surat
                </FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button type={"submit"} disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
            ) : (
              <div className={"flex gap-2"}><UploadIcon/> Upload</div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default DetailSuratUploadBerkasForm;