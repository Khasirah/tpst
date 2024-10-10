// noinspection TypeScriptValidateTypes

import TitlePage from "@/components/TitlePage.tsx";
import {Input} from "@/components/ui/input.tsx";
import * as React from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CalendarIcon, CaretSortIcon, CheckIcon, PaperPlaneIcon, TrashIcon} from "@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {cn} from "@/lib/utils.ts";
import {Calendar} from "@/components/ui/calendar.tsx";
import {format} from "date-fns";
import {Separator} from "@/components/ui/separator.tsx";
import {
  useForm,
  UseFormRegisterReturn,
  UseFormReturn
} from "react-hook-form";
import {InputSuratField, inputSuratSchema} from "@/types/InputSuratSchema.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";

const listEkspedisi = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
] as const

export default function InputSurat() {
  const id: string = "SRT-1"
  const petugasTpst: string = "123456789"
  const createdDate: Date = new Date(Date.now())
  const inputSuratForm: UseFormReturn<InputSuratField> = useForm<InputSuratField>({
    resolver: zodResolver(inputSuratSchema),
    defaultValues: {
      id: id,
      nomorSurat: "",
      perihal: "",
      pengirim: "",
      petugasTpst: petugasTpst,
      createdDate: createdDate
    }
  })
  const fileRef: UseFormRegisterReturn<string> = inputSuratForm.register("namaBerkas")

  function onSubmit(data: InputSuratField): void {
    console.log(data)
    inputSuratForm.reset()
  }

  return (
    <div className={"flex flex-col gap-3"}>
      <TitlePage title={"Input Surat"}/>
      <Separator className={"mb-4"}/>
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
                              ? listEkspedisi.find(
                                (bidang) => bidang.value === field.value
                              )?.label
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
                              {listEkspedisi.map((bidang) => (
                                <CommandItem
                                  value={bidang.label}
                                  key={bidang.value}
                                  onSelect={() => {
                                    inputSuratForm.setValue("bidang", bidang.value)
                                  }}
                                >
                                  {bidang.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      bidang.value === field.value
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
                              ? listEkspedisi.find(
                                (ekspedisi) => ekspedisi.value === field.value
                              )?.label
                              : "pilih Ekspedisi"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="pencarian ekspedisi"
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {listEkspedisi.map((ekspedisi) => (
                                <CommandItem
                                  value={ekspedisi.label}
                                  key={ekspedisi.value}
                                  onSelect={() => {
                                    inputSuratForm.setValue("ekspedisi", ekspedisi.value)
                                  }}
                                >
                                  {ekspedisi.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      ekspedisi.value === field.value
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
                name={"createdDate"}
                render={({field}) => (
                  <FormItem className={"flex flex-col gap-1"}>
                    <FormLabel>Tanggal Terima Surat</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>pilih tanggal</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage/>
                  </FormItem>
                )}
              />
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
            <div className={"flex flex-row justify-between items-center"}>
              <FormField
                control={inputSuratForm.control}
                name={"namaBerkas"}
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
                <Button type={"submit"}>
                  Submit<PaperPlaneIcon className={"ml-2"}/>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}