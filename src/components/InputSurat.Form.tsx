// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {CaretSortIcon, CheckIcon, PaperPlaneIcon, TrashIcon} from "@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {useForm, UseFormReturn} from "react-hook-form";
import {InputSuratField, inputSuratSchema} from "@/types/InputSuratSchema.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateSuratRequest} from "@/model/request/CreateSuratRequest.tsx";
import {createSurat} from "@/api/Surat.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import {Bagian} from "@/model/Bagian.tsx";
import {Ekspedisi} from "@/model/Ekspedisi.tsx";

type InputSuratFormProps = {
  bidangList: Bagian[],
  ekspedisiList: Ekspedisi[]
}

function InputSuratForm(
  {
    bidangList,
    ekspedisiList
  }: InputSuratFormProps
) {
  const inputSuratForm: UseFormReturn<InputSuratField> = useForm<InputSuratField>({
    resolver: zodResolver(inputSuratSchema),
    defaultValues: {
      nomorSurat: "",
      perihal: "",
      pengirim: "",
      noResi: "",
      kontak: ""
    }
  })
  const fileRef = inputSuratForm.register("berkas")
  const {toast} = useToast();

  function onSubmit(data: InputSuratField): void {
    const request: CreateSuratRequest = {
      nomorSurat: data.nomorSurat,
      namaPengirim: data.pengirim,
      perihal: data.perihal,
      idEkspedisi: data.ekspedisi,
      nomorSeriEkspedisi: data.noResi ? data.noResi : "",
      kontakPengirim: data.kontak ? data.kontak : "",
      idTujuanBagian: data.bidang
    }
    let berkas = null;
    if (data.berkas) {
      berkas = data.berkas[0]
    }

    createSurat(request, berkas)
      .then((data) => {
        toast({
          description: data.data
        })
      })
      .catch(e => {
        toast({
          variant: "destructive",
          description: e
        })
      })

    inputSuratForm.reset()
  }

  return (
    <Form {...inputSuratForm}>
      <form onSubmit={inputSuratForm.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-8">
          <div className={"flex flex-row gap-4"}>
            <FormField
              control={inputSuratForm.control}
              name={"nomorSurat"}
              render={({field}) => (
                <FormItem className={"w-1/2"}>
                  <FormLabel>Nomor Surat</FormLabel>
                  <FormControl>
                    <Input placeholder="nomor surat" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={inputSuratForm.control}
              name={"perihal"}
              render={({field}) => (
                <FormItem className={"w-1/2"}>
                  <FormLabel>Perihal</FormLabel>
                  <FormControl>
                    <Input placeholder="perihal" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className={"flex flex-row gap-4"}>
            <FormField
              control={inputSuratForm.control}
              name="bidang"
              render={({field}) => (
                <FormItem className={"w-1/4"}>
                  <FormLabel>Bidang</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? bidangList.find(
                              (bidang) => bidang.id === field.value
                            )?.namaBagian
                            : "pilih bidang"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="pencarian bidang"
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>bidang yang dicari tidak ditemukan.</CommandEmpty>
                          <CommandGroup>
                            {bidangList.map((bidang) => (
                              <CommandItem
                                value={bidang.id.toString()}
                                key={bidang.id}
                                onSelect={() => {
                                  inputSuratForm.setValue("bidang", bidang.id)
                                }}
                              >
                                {bidang.namaBagian}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    bidang.id === field.value
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
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={inputSuratForm.control}
              name="ekspedisi"
              render={({field}) => (
                <FormItem className={"w-1/4"}>
                  <FormLabel>Ekspedisi</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? ekspedisiList.find(
                              (ekspedisi) => ekspedisi.id === field.value
                            )?.namaEkspedisi
                            : "pilih ekspedisi"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] h-64 p-0">
                      <Command>
                        <CommandInput
                          placeholder="pencarian ekspedisi"
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>Ekspedisi tidak ditemukan</CommandEmpty>
                          <CommandGroup>
                            {ekspedisiList.map((ekspedisi) => (
                              <CommandItem
                                value={ekspedisi.id.toString()}
                                key={ekspedisi.id}
                                onSelect={() => {
                                  inputSuratForm.setValue("ekspedisi", ekspedisi.id)
                                }}
                              >
                                {ekspedisi.namaEkspedisi}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    ekspedisi.id === field.value
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
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={inputSuratForm.control}
              name={"noResi"}
              render={({field}) => (
                <FormItem className={"w-1/4"}>
                  <FormLabel>Nomor Resi (Opsional)</FormLabel>
                  <FormControl>
                    <Input placeholder="no seri" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={inputSuratForm.control}
              name={"kontak"}
              render={({field}) => (
                <FormItem className={"w-1/4"}>
                  <FormLabel>Kontak (Opsional)</FormLabel>
                  <FormControl>
                    <Input placeholder="kontak" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className={"flex flex-row gap-4"}>
            <FormField
              control={inputSuratForm.control}
              name={"pengirim"}
              render={({field}) => (
                <FormItem className={"w-1/3 flex flex-col gap-1"}>
                  <FormLabel>Pengirim</FormLabel>
                  <FormControl>
                    <Input placeholder="pengirim" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className={"flex flex-row justify-between items-end"}>
            <FormField
              control={inputSuratForm.control}
              name={"berkas"}
              render={() => (
                <FormItem className={"w-1/4"}>
                  <FormLabel>Upload Surat</FormLabel>
                  <FormControl>
                    <Input
                      type={"file"}
                      placeholder={"hasil scan surat"}
                      {...fileRef}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className={"flex flex-row gap-4"}>
              <Button
                type={"reset"}
                onClick={() => inputSuratForm.reset()}
                variant="secondary"
              >
                <TrashIcon className={"mr-2"}/>Hapus
              </Button>
              <Button type={"submit"} disabled={inputSuratForm.formState.isSubmitting}>
                Submit<PaperPlaneIcon className={"ml-2"}/>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default InputSuratForm;