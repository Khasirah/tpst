import TitlePage from "@/components/TitlePage.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import SuratMasukForm from "@/components/SuratMasuk.Form.tsx";

function SuratMasuk() {
  return (
    <div className={"flex flex-col gap-3"}>
      <TitlePage title={"Surat Masuk Bidang"}/>
      <Separator className={"mb-4"}/>
      <SuratMasukForm/>
    {/*  surat masuk table*/}
    </div>
  )
}

export default SuratMasuk;