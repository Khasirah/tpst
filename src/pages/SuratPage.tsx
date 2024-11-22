import { useLoaderData, useNavigate} from "react-router-dom";
import TitlePage from "@/components/TitlePage.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {getDayName} from "@/model/DaysName.tsx";
import {getMonthName} from "@/model/MonthName.tsx";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {TrashIcon} from "@radix-ui/react-icons";
import useSecureLs from "@/hooks/useSecureLs.tsx";
import {isAdmin} from "@/utils/Helper.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {suratPageSchema} from "@/types/SuratPageSchema.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem, FormLabel,
  FormMessage
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {FilePlus} from "lucide-react";
import {deleteSurat, updateSurat} from "@/api/Surat.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import {UpdateSuratRequest} from "@/model/request/UpdateSuratRequest.tsx";
import {ErrorMessages} from "@/model/ErrorMessages.tsx";
import {SuratResponse} from "@/model/response/SuratResponse.tsx";

type loader = {
  surat: SuratResponse
}

function SuratPage() {
  const {surat} = useLoaderData() as loader;
  const {getItem} = useSecureLs();
  const suratPageForm = useForm<z.infer<typeof suratPageSchema>>({
    resolver: zodResolver(suratPageSchema),
  });
  const fileRef = suratPageForm.register("berkas")
  const {toast} = useToast();
  const navigate = useNavigate();


  const tanggalTerima = new Date(surat.tanggalTerimaSurat)
  const tanggal = `${getDayName(tanggalTerima.getDay())}, 
  ${tanggalTerima.getDate()} ${getMonthName(tanggalTerima.getMonth())} 
  ${tanggalTerima.getFullYear()}`

  let tanggalTerimaBidang: string | Date = "-"
  let tanggalBidang: string = "-"

  if (surat.tanggalTerimaBidang) {
    tanggalTerimaBidang = new Date(surat.tanggalTerimaBidang)
    tanggalBidang = `${tanggalTerimaBidang.toLocaleTimeString()} (${getDayName(tanggalTerimaBidang.getDay())}, 
  ${tanggalTerimaBidang.getDate()} ${getMonthName(tanggalTerimaBidang.getMonth())} 
  ${tanggalTerimaBidang.getFullYear()})`
  }

  async function onSubmit(data: z.infer<typeof  suratPageSchema>) {
    let berkas = null;
    const request: UpdateSuratRequest = {
      kontak: surat.kontak,
      tanggalTerimaBidang: surat.tanggalTerimaBidang,
      nomorSeriEkspedisi: surat.nomorSeriEkspedisi,
      idPosisi: surat.posisiSurat.id,
      namaBerkas: surat.namaBerkas,
      penerimaBidang: surat.penerimaBagian
    }
    if (data.berkas?.length != 0) {
      berkas = data.berkas?.item(0) || null
      request.namaBerkas = data.berkas?.item(0)?.name || surat.namaBerkas
    }

    if (data.berkas?.length == 0) {
      toast({
        variant: "destructive",
        description: ErrorMessages.noFileToBeUploaded
      })
      return
    }

    updateSurat(surat.id, berkas, request)
      .then(response => {
        toast({
          description: response
        })
        navigate(`/surat/${surat.id}`)
      })
      .catch(e => {
        toast({
          variant: "destructive",
          description: e
        })
      })
  }

  async function onDeleteHandle() {

    deleteSurat(surat.id)
      .then(() => {
        navigate("/tandaTerima")
      })
      .catch(e => {
        toast({
          variant: "destructive",
          description: e
        })
      })
  }


  return <div className={"flex flex-col gap-3"}>
    <TitlePage title={"Detail Surat"}/>
    <Separator className={"mb-4"}/>
    <div className={"flex flex-col gap-5"}>
      <div className={"flex flex-row justify-between"}>
        <table>
          <tbody>
          <tr>
            <td>Nomor</td>
            <td className={"w-3 text-center"}>:</td>
            <td>{surat.nomorSurat}</td>
          </tr>
          <tr>
            <td>Perihal</td>
            <td className={"w-3 text-center"}>:</td>
            <td>{surat.perihal}</td>
          </tr>
          <tr>
            <td>Tanggal Terima</td>
            <td className={"w-3 text-center"}>:</td>
            <td>
              {tanggal} ({tanggalTerima.toLocaleTimeString("en-US", {hour12: false})})
            </td>
          </tr>
          <tr>
            <td>Tujuan</td>
            <td className={"w-3 text-center"}>:</td>
            <td>
              {surat.namaBagian}
            </td>
          </tr>
          <tr>
            <td>Kontak Pengirim</td>
            <td className={"w-3 text-center"}>:</td>
            <td>
              {surat.kontak ? surat.kontak : "-"}
            </td>
          </tr>
          <tr>
            <td>Petugas TPST</td>
            <td className={"w-3 text-center"}>:</td>
            <td>
              {surat.namaPetugasTpst}
            </td>
          </tr>
          <tr>
            <td>No. Resi</td>
            <td className={"w-3 text-center"}>:</td>
            <td>
              {surat.nomorSeriEkspedisi ? surat.nomorSeriEkspedisi : "-"}
            </td>
          </tr>
          <tr>
            <td>Penerima Bidang</td>
            <td className={"w-3 text-center"}>:</td>
            <td>
              {surat.penerimaBagian ? surat.penerimaBagian : "-"}
            </td>
          </tr>
          <tr>
            <td>Tanggal Terima Bidang</td>
            <td className={"w-3 text-center"}>:</td>
            <td>
              {surat.tanggalTerimaBidang ? tanggalBidang : "-"}
            </td>
          </tr>
          <tr>
            <td>Posisi Surat</td>
            <td className={"w-3 text-center"}>:</td>
            <td>
              {surat.posisiSurat ? surat.posisiSurat.keteranganPosisi : "-"}
            </td>
          </tr>
          <tr>
            <td>Berkas</td>
            <td className={"w-3 text-center"}>:</td>
            <td className={"flex flex-row items-center gap-3"}>
              {surat.namaBerkas ? surat.namaBerkas : "tidak ada berkas"}
            </td>
          </tr>
          </tbody>
        </table>
        <div className={"flex flex-col items-end"}>
          <Badge variant={surat.status === "active" ? "default" : "destructive"}>{surat.status}</Badge>
          <p className={"font-bold text-2xl"}>{surat.namaPengirim}</p>
          <p className={"text-muted-foreground text-lg"}>{surat.namaEkspedisi}</p>
        </div>
      </div>
      <Form {...suratPageForm}>
        <form onSubmit={suratPageForm.handleSubmit(onSubmit)} className={"flex flex-row gap-2 items-end"}>
          <FormField
            control={suratPageForm.control}
            name="berkas"
            render={() => (
              <FormItem>
                <FormLabel>Upload berkas (Max: 5MB)</FormLabel>
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
          <Button type="submit" variant={"outline"}>
            <FilePlus /> Simpan
          </Button>
        </form>
      </Form>
      <div>
        {isAdmin(getItem("namaKelompok")) &&
          <div className={"flex flex-row gap-4"}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>
                  <TrashIcon/> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDeleteHandle}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        }
      </div>
    </div>
  </div>
}

export default SuratPage;