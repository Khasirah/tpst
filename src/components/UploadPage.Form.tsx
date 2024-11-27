import {useForm} from "react-hook-form";
import {z} from "zod";
import {uploadUserSchema} from "@/types/UploadUser.Schema.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
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
import UploadPageDescription from "@/components/UploadPage.Description.tsx";
import {uploadUsers} from "@/api/User.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import {ErrorMessages} from "@/model/ErrorMessages.tsx";
import {ReloadIcon} from "@radix-ui/react-icons";

function UploadPageForm() {
  const {toast} = useToast();
  const form = useForm<z.infer<typeof uploadUserSchema>>({
    resolver: zodResolver(uploadUserSchema)
  })
  const fileRef = form.register("csvFile")

  function onSubmit(data: z.infer<typeof uploadUserSchema>) {

    if (data.csvFile.item(0) == null) {
      toast({
        variant: "destructive",
        description: ErrorMessages.fileNotCSV
      })
    }

    uploadUsers(data.csvFile.item(0) as File)
      .then(response => {
        toast({
          description: response
        })
      })
      .catch(e => {
        toast({
          variant: "destructive",
          description: e
        })
      })

    form.reset()
  }

  return (
    <div className={"flex flex-row justify-between"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="csvFile"
            render={() => (
              <FormItem className={"max-w-lg"}>
                <FormLabel>Upload CSV</FormLabel>
                <FormControl>
                  <Input
                    type={"file"}
                    placeholder="csv file"
                    {...fileRef}
                  />
                </FormControl>
                <FormDescription>
                  silahkan upload csv file, dengan header (idUser, namaUser, idBagian,
                  idKelompok)
                </FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button type={"submit"} disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
      <UploadPageDescription/>
    </div>
  )
}

export default UploadPageForm;