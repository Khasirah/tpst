import {SuratResponse} from "@/model/response/SuratResponse.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {createATag, generateDateFormat} from "@/utils/Helper.tsx";
import DetailSuratUploadBerkasForm from "@/components/DetailSurat.UploadBerkas.Form.tsx";
import {downloadBerkas} from "@/api/Surat.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useToast} from "@/hooks/use-toast.ts";

type DetailSuratTableProps = {
  surat: SuratResponse,
  uploadHandler: (pdfFile: File) => void
}

function DetailSuratTable(
  {
    surat,
    uploadHandler
  }: DetailSuratTableProps
) {
  const tanggalTerimaSurat = generateDateFormat(surat.tanggalTerimaSurat);
  const {toast} = useToast();
  let tanggalTerimaBidang: string | null = null
  if (surat.tanggalTerimaBidang != null) {
    tanggalTerimaBidang = generateDateFormat(surat.tanggalTerimaBidang)
  }

  function downloadHandler() {
    downloadBerkas(surat.id)
      .then(response => {
        createATag(response, surat.namaBerkas)
      })
      .catch(e => {
        toast({
          variant: "destructive",
          description: e
        })
      })
  }

  return (
    <div className={"space-y-4"}>
      <table className={"table"}>
        <tbody>
        <tr>
          <td>Nomor Surat</td>
          <td className={"pr-4"}>:</td>
          <td>{surat.nomorSurat}</td>
        </tr>
        <tr>
          <td>Pengirim</td>
          <td>:</td>
          <td>{surat.namaPengirim}</td>
        </tr>
        <tr>
          <td>Perihal</td>
          <td>:</td>
          <td>{surat.perihal}</td>
        </tr>
        <tr>
          <td>Tujuan Bidang</td>
          <td>:</td>
          <td>{surat.namaBagian}</td>
        </tr>
        <tr>
          <td>Posisi Surat</td>
          <td>:</td>
          <td>{surat.posisiSurat.keteranganPosisi}</td>
        </tr>
        <tr>
          <td>Ekspedisi</td>
          <td>:</td>
          <td>{surat.namaEkspedisi}</td>
        </tr>
        <tr>
          <td>Nomor Resi</td>
          <td>:</td>
          <td>{surat.nomorSeriEkspedisi || "-"}</td>
        </tr>
        <tr>
          <td>Kontak</td>
          <td>:</td>
          <td>{surat.kontak || "-"}</td>
        </tr>
        <tr>
          <td>Diterima Oleh</td>
          <td>:</td>
          <td>{surat.namaPetugasTpst}</td>
        </tr>
        <tr>
          <td>Tanggal Terima Bidang</td>
          <td>:</td>
          <td>{tanggalTerimaBidang || "-"}</td>
        </tr>
        <tr>
          <td>Penerima Bidang</td>
          <td>:</td>
          <td>{surat.penerimaBagian || "-"}</td>
        </tr>
        <tr>
          <td>Berkas</td>
          <td>:</td>
          <td>{surat.namaBerkas
          ? (
            <Button
              variant={"link"}
              className={"p-0"}
              onClick={downloadHandler}
            >{surat.namaBerkas}</Button>
            )
          : "-"}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>:</td>
          <td>
            <Badge
              variant={
                surat.status == "active" ? "success" : "destructive"
              }
            >
              {surat.status}
            </Badge>
          </td>
        </tr>
        <tr>
          <td>Tanggal Terima TPST</td>
          <td>:</td>
          <td>{tanggalTerimaSurat}</td>
        </tr>
        </tbody>
      </table>
      <DetailSuratUploadBerkasForm uploadHandler={uploadHandler}/>
    </div>
  )
}

export default DetailSuratTable;