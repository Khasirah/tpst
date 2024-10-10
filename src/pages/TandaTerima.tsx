import * as React from "react";
import TitlePage from "@/components/TitlePage.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {listSurat} from "@/types/ListSurat.tsx";
import DataTable from "@/components/DataTable.tsx";
import {columns} from "@/types/columns.tsx";

export default function TandaTerima(): React.JSX.Element {
  const data = listSurat

  return (
    <div className={"flex flex-col gap-3"}>
      <TitlePage title={"Tanda Terima"}/>
      <Separator className={"mb-4"}/>
      <DataTable columns={columns} data={data}/>
    </div>
  )
}