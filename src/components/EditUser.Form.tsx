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
import {zodResolver} from "@hookform/resolvers/zod";
import {getAllBagian} from "@/api/Bagian.tsx";
import {getAllKelompok} from "@/api/Kelompok.tsx";
import {UserResponse} from "@/model/response/UserResponse.tsx";
import {editUserSchema} from "@/types/EditUser.Schema.ts";
import {UpdateSpecificUserRequest} from "@/model/request/UpdateSpecificUserRequest.ts";
import {updateCurrentUser, updateSpecificUser} from "@/api/User.tsx";
import {useToast} from "@/hooks/use-toast.ts";

type EditUserFormProp = {
  user: UserResponse,
  isCurrentUser?: boolean
}

function EditUserForm(
  {
    user,
    isCurrentUser = false
  }: EditUserFormProp
) {
  const {toast} = useToast();
  const [bagianList, setBagianList] = useState<Bagian[]>([])
  const [kelompokList, setKelompokList] = useState<Kelompok[]>([])
  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      idUser: "",
      namaUser: "",
      password: ""
    }
  })

  function setFormValue(user: UserResponse) {
    form.setValue("idUser", user.idUser)
    form.setValue("namaUser", user.namaUser)
    form.setValue("idBagian", user.bagian.id.toString())
    form.setValue("idKelompok", user.kelompok.id.toString())
  }

  function onSubmit(data: z.infer<typeof editUserSchema>) {
    const request: UpdateSpecificUserRequest = {
      idUser: data.idUser,
      namaUser: data.namaUser,
      idBagian: parseInt(data.idBagian),
      idKelompok: parseInt(data.idKelompok),
      password: data.password ? data.password : null
    }

    if (!isCurrentUser) {
      updateSpecificUser(request)
        .then(response => {
          toast({
            description: `berhasil mengubah data ${response.namaUser}`
          })
          setFormValue(response)
        })
        .catch(e => {
          toast({
            variant: "destructive",
            description: e
          })
        })
    }

    if (isCurrentUser) {
      updateCurrentUser(request)
        .then(response => {
          toast({
            description: `berhasil mengubah data ${response.namaUser}`
          })
          setFormValue(response)
        })
        .catch(e => {
          toast({
            variant: "destructive",
            description: e
          })
        })
    }

    form.reset({
      password: ""
    })
  }

  useEffect(() => {
    setFormValue(user)
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
  })

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
                <Input
                  disabled
                  placeholder="nip pendek"
                  {...field}
                />
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
                <Input
                  disabled={isCurrentUser}
                  placeholder="nama"
                  {...field}
                />
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
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>Bidang</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={isCurrentUser}
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
                      <ChevronsUpDown className="opacity-50"/>
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
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idKelompok"
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>Kelompok</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={isCurrentUser}
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
                      <ChevronsUpDown className="opacity-50"/>
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
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem className={"max-w-sm"}>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type={"password"} placeholder="new password" {...field} />
              </FormControl>
              <FormDescription>
                Kosongkan apabila tidak ingin mengganti password
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default EditUserForm;