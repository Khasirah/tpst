import TitlePage from "@/components/TitlePage.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {columnsPetugas} from "@/types/columnsPetugas.tsx";
import DataTable from "@/components/DataTable.tsx";
import {useLoaderData} from "react-router-dom";
import {WebResponse} from "@/model/response/WebResponse.tsx";
import {UserResponse} from "@/model/response/UserResponse.tsx";
import {useState} from "react";

export type loaderType = {
  data: WebResponse<UserResponse[]>
}

function Petugas() {
  const {data} = useLoaderData() as loaderType;
  const [dataForDataTable, setDataForDataTable] =
    useState<WebResponse<UserResponse[]>>(data)

  function dataChangeHandler(dataChange: loaderType) {
    setDataForDataTable(dataChange.data)
  }

  return <div className={"flex flex-col gap-3"}>
    <TitlePage title={"Daftar Petugas"}/>
    <Separator className={"mb-4"}/>
    <div>
      <DataTable
        dataChangeHandler={dataChangeHandler}
        columns={columnsPetugas(dataChangeHandler)}
        data={dataForDataTable.data}
        page={"petugas"}
        paging={dataForDataTable.paging}
      />
    </div>
  </div>
}

export default Petugas;