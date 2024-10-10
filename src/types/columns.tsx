import {ColumnDef} from "@tanstack/react-table";

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
]