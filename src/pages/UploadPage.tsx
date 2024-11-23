import TitlePage from "@/components/TitlePage.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import UploadPageForm from "@/components/UploadPage.Form.tsx";

function UploadPage() {

  return (
    <div className={"flex flex-col gap-3"}>
      <TitlePage title={"Upload Petugas"}/>
      <Separator className={"mb-4"}/>
      <UploadPageForm/>
    </div>
  )
}

export default UploadPage;