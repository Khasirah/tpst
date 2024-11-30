import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {PrinterIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import generateTandaTerima from "@/components/TandaTerimaPdf.tsx";
import {ForListSuratResponse} from "@/model/response/ForListSuratResponse.tsx";
import {getSuratById} from "@/api/Surat.tsx";
import {Pencil2Icon} from "@radix-ui/react-icons";
import {NavLink} from "react-router";

export const columnsTandaTerima: ColumnDef<ForListSuratResponse>[] = [
  {
    accessorKey: "nomorSurat",
    header: "Nomor Surat"
  },
  {
    accessorKey: "perihal",
    header: "Perihal"
  },
  {
    accessorKey: "namaPengirim",
    header: "Pengirim"
  },
  {
    accessorKey: "namaPetugasTpst",
    header: "Petugas"
  },
  {
    accessorKey: "tanggalTerima",
    header: "Tanggal Terima",
    cell: ({row}) => {
      const surat = row.original
      const dateValue = new Date(surat.tanggalTerima)
      return <div>{dateValue.getDate()}/{dateValue.getMonth() + 1}/{dateValue.getFullYear()}, {dateValue.toLocaleTimeString("en-GB")}</div>
    }
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({row}) => {
      const idSurat = row.original.idSurat

      async function onClickCetakHandler() {
        const surat = await getSuratById(idSurat)
        const pdf = await generateTandaTerima(surat)
        pdf.open()
      }

      return (
        <div className={"flex flex-row gap-1"}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={onClickCetakHandler} variant="outline" size="icon">
                  <PrinterIcon className={"size-5"}/>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cetak Tanda Terima</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <NavLink to={`/surat/${idSurat}`}>
                    <Pencil2Icon className={"size-5"}/>
                  </NavLink>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    }
  }
]