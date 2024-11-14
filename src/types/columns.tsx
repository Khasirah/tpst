import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDownIcon, PrinterIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Surat} from "@/types/Surat.tsx";
import generateTandaTerima from "@/components/TandaTerimaPdf.tsx";

export const columns: ColumnDef<Surat>[] = [
  {
    accessorKey: "nomorSurat",
    header: "Nomor Surat"
  },
  {
    accessorKey: "perihal",
    header: "Perihal"
  },
  {
    accessorKey: "pengirim",
    header: "Pengirim"
  },
  {
    accessorKey: "petugasTpst",
    header: "Petugas"
  },
  {
    accessorKey: "createdDate",
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
      const dateValue = new Date(row.getValue("createdDate").toString())
      return `${dateValue.toLocaleDateString()}`
    }
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({row}) => {
      const surat = row.original

      async function onClickHandler() {
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