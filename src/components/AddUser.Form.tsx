// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
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
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {useEffect, useState} from "react";
import {Bagian} from "@/model/Bagian.tsx";
import {Kelompok} from "@/model/Kelompok.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {addUserSchema} from "@/types/AddUserSchema.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {getAllBagian} from "@/api/Bagian.tsx";
import {getAllKelompok} from "@/api/Kelompok.tsx";

type AddUserFormProps = {
  onSubmitHandle: (data: z.infer<typeof addUserSchema>) => void
}

function AddUserForm({onSubmitHandle}: AddUserFormProps) {
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
    onSubmitHandle(data)

    form.reset({
      idUser: "",
      namaUser: "",
    })
  }

  useEffect(() => {
    getAllBagian()
      .then(data => {
        setBagianList(data.data)
      })
      .catch(e => {
        console.log(e)
      })

    getAllKelompok()
      .then(data => {
        setKelompokList(data.data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="idUser"
          render={({field}) => (
            <FormItem className={"max-w-sm"}>
              <FormLabel>NIP Pendek</FormLabel>
              <FormControl>
                <Input placeholder="nip pendek" {...field} />
              </FormControl>
              <FormDescription>
                Ini akan menjadi username Anda
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="namaUser"
          render={({field}) => (
            <FormItem className={"max-w-sm"}>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="nama" {...field} />
              </FormControl>
              <FormDescription>
                Ini akan menjadi nama yang dimunculkan
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idBagian"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Bidang</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? bagianList.find(
                          (bagian) => bagian.id.toString() === field.value
                        )?.namaBagian
                        : "Pilih bidang"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="pencarian bidang ..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>bidang tidak ditemukan.</CommandEmpty>
                      <CommandGroup>
                        {bagianList.map((bagian) => (
                          <CommandItem
                            value={bagian.id.toString()}
                            key={bagian.id}
                            onSelect={() => {
                              form.setValue("idBagian", bagian.id.toString())
                            }}
                          >
                            {bagian.namaBagian}
                            <Check
                              className={cn(
                                "ml-auto",
                                bagian.id.toString() === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
            <FormItem className="flex flex-col">
              <FormLabel>Kelompok</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? kelompokList.find(
                          (kelompok) => kelompok.id.toString() === field.value
                        )?.namaKelompok
                        : "Pilih kelompok"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="pencarian kelompok ..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>kelompok tidak ditemukan.</CommandEmpty>
                      <CommandGroup>
                        {kelompokList.map((kelompok) => (
                          <CommandItem
                            value={kelompok.id.toString()}
                            key={kelompok.id}
                            onSelect={() => {
                              form.setValue("idKelompok", kelompok.id.toString())
                            }}
                          >
                            {kelompok.namaKelompok}
                            <Check
                              className={cn(
                                "ml-auto",
                                kelompok.id.toString() === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
  )
}

export default AddUserForm;