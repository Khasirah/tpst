import TitlePage from "@/components/TitlePage.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {addUserSchema} from "@/types/AddUserSchema.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button.tsx";
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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useEffect, useState} from "react";
import {Bagian} from "@/model/Bagian.tsx";
import {Kelompok} from "@/model/Kelompok.tsx";
import {getAllBagian} from "@/api/Bagian.tsx";



function AddUser() {
  const [bagianList, setBagianList] = useState<Bagian[]>([])
  const [kelompokList, setKelompokList] = useState<Kelompok[]>([])
  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      idUser: "",
      namaUser: "",
    }
  })

  function onSubmit(data: z.infer<typeof addUserSchema>) {
    console.log(data)
  }

  useEffect(() => {

  }, [])

  return (
    <div className={"flex flex-col gap-3"}>
      <TitlePage title={"Tambah Petugas"}/>
      <Separator className={"mb-4"}/>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="idUser"
              render={({ field }) => (
                <FormItem className={"max-w-sm"}>
                  <FormLabel>NIP Pendek</FormLabel>
                  <FormControl>
                    <Input placeholder="nip pendek" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="namaUser"
              render={({ field }) => (
                <FormItem className={"max-w-sm"}>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="nama" {...field} />
                  </FormControl>
                  <FormDescription>
                    Ini akan menjadi nama yang dimunculkan
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idBagian"
              render={({ field }) => (
                <FormItem className={"max-w-sm"}>
                  <FormLabel>Bidang</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Silahkan pilih bidang yang sesuai" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">m@example.com</SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">m@support.com</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Ini akan menjadi bidang anda
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idKelompok"
              render={({ field }) => (
                <FormItem className={"max-w-sm"}>
                  <FormLabel>Kelompok</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Silahkan pilih kelompok yang sesuai" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">m@example.com</SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">m@support.com</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Ini akan menjadi kelompok anda
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default AddUser;