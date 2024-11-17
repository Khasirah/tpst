import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDownIcon, PrinterIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import generateTandaTerima from "@/components/TandaTerimaPdf.tsx";
import {ForListSuratResponse} from "@/model/response/ForListSuratResponse.tsx";
import {getSuratById} from "@/api/Surat.tsx";

export const columns: ColumnDef<ForListSuratResponse>[] = [
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
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Terima
          <ArrowUpDownIcon className={"ml-2 h-4 w-4"}/>
        </Button>
      )
    },
    cell: ({row}) => {
      const dateValue = new Date(row.getValue("tanggalTerima").toString())
      return `${dateValue.toLocaleDateString()}`
    }
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({row}) => {
      const idSurat = row.original.idSurat

      async function onClickHandler() {
        const surat = await getSuratById(idSurat)
        const pdf = await generateTandaTerima(surat)
        pdf.open()
      }

      return (
        <div className={"flex flex-row gap-1"}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button onClick={onClickHandler} variant="outline" size="icon" asChild>
                  <PrinterIcon className={"h-5"}/>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cetak Tanda Terima</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    }
  }
]