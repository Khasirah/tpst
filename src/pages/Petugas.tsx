import TitlePage from "@/components/TitlePage.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {columnsPetugas} from "@/types/columnsPetugas.tsx";
import DataTable from "@/components/DataTable.tsx";
import {WebResponse} from "@/model/response/WebResponse.tsx";
import {UserResponse} from "@/model/response/UserResponse.tsx";
import {useEffect, useState} from "react";
import {searchUser} from "@/api/User.tsx";


function Petugas() {
  const [dataForDataTable, setDataForDataTable] =
    useState<WebResponse<UserResponse[]>>({
      data: [],
      paging: {
        totalPage: 0,
        currentPage: 0,
        size: 0
      },
      errors: ""
    })

  function dataChangeHandler(dataChange: WebResponse<UserResponse[]>) {
    setDataForDataTable(dataChange)
  }

  useEffect(() => {
    searchUser()
      .then(data => {
        setDataForDataTable(data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

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