import {ColumnDef} from "@tanstack/react-table";
import {ForListSuratResponse} from "@/model/response/ForListSuratResponse.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {NavLink} from "react-router";
import {BackpackIcon, Pencil2Icon} from "@radix-ui/react-icons";
import {archiveSurat, getSuratByDate} from "@/api/Surat.tsx";
import {WebResponse} from "@/model/response/WebResponse.tsx";
import {DataChangeHandler} from "@/pages/SuratMasuk.tsx";

export const columnsSuratMasuk = (
  dataChangeHandler: (
    {
      status,
      message
    }: DataChangeHandler,
    data?: WebResponse<ForListSuratResponse[]>,
  ) => void
): ColumnDef<ForListSuratResponse>[] => [
  {
    id: "select",
    header: ({table}) => {
      const tableState = table.getState();
      async function handleArchive() {
        let receiptDate;
        const listIdSurat: number[] = table.getFilteredSelectedRowModel().rows
          .map(item => {
            return item.original.idSurat
          })

        if (table.getFilteredSelectedRowModel().rows.at(0) != undefined) {
          receiptDate = table.getFilteredSelectedRowModel().rows.at(0)

        }

        if (listIdSurat.length > 0) {
          try {
            const response = await archiveSurat(listIdSurat)
            if (receiptDate?.original.tanggalTerima) {
              receiptDate = new Date(receiptDate?.original.tanggalTerima)
              const dataResponse = await getSuratByDate(
                receiptDate,
                tableState.pagination.pageIndex,
                tableState.pagination.pageSize
              )
              dataChangeHandler(
                {status: true, message: response.data},
                dataResponse
              )
            }
          } catch (e) {
            if (typeof e == "string") {
              dataChangeHandler(
                {status: false, message: e}
              )
            }
          }
        }
      }

      return (
        <div className={"flex gap-2 items-center"}>
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"ghost"} size={"icon"} onClick={handleArchive}>
                  <BackpackIcon/>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Arsip</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    },
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nomorSurat",
    header: "Nomor Surat"
  },
  {
    accessorKey: "perihal",
    header: "Perihal",
    cell: ({row}) => (
      <p className={"truncate"}>{row.original.perihal}</p>
    )
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
    accessorKey: "posisiSurat.keteranganPosisi",
    header: "Posisi Surat"
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({row}) => {
      const idSurat = row.original.idSurat

      return (
        <div className={"flex flex-row gap-1"}>
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