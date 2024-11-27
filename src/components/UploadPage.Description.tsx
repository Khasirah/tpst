import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useEffect, useState} from "react";
import {getAllBagian} from "@/api/Bagian.tsx";
import {Bagian} from "@/model/Bagian.tsx";
import {useToast} from "@/hooks/use-toast.ts";


function UploadPageDescription() {
  const [bagianList, setBagianList] = useState<Bagian[]>([])
  const {toast} = useToast();

  useEffect(() => {
    getAllBagian()
      .then(response => {
        setBagianList(response.data)
      })
      .catch(e => {
        toast({
          variant: "destructive",
          description: e
        })
      })
  })

  return (
    <div className={"space-y-4"}>
      <Table>
        <TableCaption>Penjelasan csv file</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Kolom</TableHead>
            <TableHead>Keterangan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">idUser</TableCell>
            <TableCell>string, gunakan nip pendek</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">namaUser</TableCell>
            <TableCell>string, minimanl 3 huruf</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">idBagian*</TableCell>
            <TableCell>number</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">idKelompok</TableCell>
            <TableCell>number, 1: admin | 2: user</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableCaption>Daftar Bagian / Bidang*</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Keterangan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bagianList.map(bagian => (
            <TableRow key={bagian.id}>
              <TableCell className="font-medium">{bagian.id}</TableCell>
              <TableCell>{bagian.namaBagian}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UploadPageDescription;