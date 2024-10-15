// noinspection TypeScriptValidateTypes

import * as React from "react";
import TitlePage from "@/components/TitlePage.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {listSurat} from "@/types/ListSurat.tsx";
import DataTable from "@/components/DataTable.tsx";
import {columns} from "@/types/columns.tsx";
import {useForm} from "react-hook-form";
import {TandaTerimaField, tandaTerimaSchema} from "@/types/TandaTerimaSchema.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {listTahun} from "@/types/ListTahun.tsx";
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {useState} from "react";

export default function TandaTerima(): React.JSX.Element {
  const form = useForm<TandaTerimaField>({
    resolver: zodResolver(tandaTerimaSchema)
  })
  const [daftarSurat, setDaftarSurat] = useState([])

  async function onSubmit(data: TandaTerimaField) {
    console.log(data)
    setDaftarSurat(listSurat)
  }

  return (
    <div className={"flex flex-col gap-3"}>
      <TitlePage title={"Tanda Terima"}/>
      <Separator className={"mb-4"}/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-row items-end gap-3"} method={"get"}>
          <FormField
            control={form.control}
            name="tahun"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tahun</FormLabel>
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
                          ? listTahun.find(
                            (tahun) => tahun.value === field.value
                          )?.label
                          : "pilih tahun"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="pencarian tahun..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>Tahun tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                          {listTahun.map((tahun) => (
                            <CommandItem
                              value={tahun.label}
                              key={tahun.value}
                              onSelect={() => {
                                form.setValue("tahun", tahun.value)
                              }}
                            >
                              {tahun.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  tahun.value === field.value
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {
        daftarSurat.length != 0
        ? <DataTable columns={columns} data={listSurat}/>
        : <div className={"flex justify-center text-2xl"}>Tidak ada data</div>
      }
    </div>
  )
}