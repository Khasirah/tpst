import TitlePage from "@/components/TitlePage.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import SuratMasukForm from "@/components/SuratMasuk.Form.tsx";
import {useState} from "react";
import {WebResponse} from "@/model/response/WebResponse.tsx";
import {ForListSuratResponse} from "@/model/response/ForListSuratResponse.tsx";
import {SuratMasukDataTable} from "@/components/SuratMasuk.DataTable.tsx";
import {columnsSuratMasuk} from "@/types/columnsSuratMasuk.tsx";
import {useToast} from "@/hooks/use-toast.ts";

export type DataChangeHandler = {
  status: boolean,
  message: string
}

function SuratMasuk() {
  const [data, setData] = useState<WebResponse<ForListSuratResponse[]>>({
    data: [],
    paging: {
      totalPage: 0,
      size: 0,
      currentPage: 0
    },
    errors: ""
  });
  const {toast} = useToast();

  function dataChangeHandler(
    {status, message}: DataChangeHandler,
    data?: WebResponse<ForListSuratResponse[]>,
  ) {
    if(data) {
      setData(data)
    }
    if (status) {
      toast({
        description: message
      })
    } else {
      toast({
        variant: "destructive",
        description: message
      })
    }
  }

  return (
    <div className={"flex flex-col gap-3"}>
      <TitlePage title={"Surat Masuk Bidang"}/>
      <Separator className={"mb-4"}/>
      <SuratMasukForm setDataHandler={setData}/>
      <SuratMasukDataTable
        columns={columnsSuratMasuk(dataChangeHandler)}
        data={data.data}
        paging={data.paging}
      />
    </div>
  )
}

export default SuratMasuk;