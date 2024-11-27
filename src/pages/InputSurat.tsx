// noinspection TypeScriptValidateTypes

import TitlePage from "@/components/TitlePage.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {useEffect, useState} from "react";
import {Bagian} from "@/model/Bagian.tsx";
import {Ekspedisi} from "@/model/Ekspedisi.tsx";
import {getBagianAndEkspedisi} from "@/api/InputSurat.tsx";
import {Loading} from "@/components/Loading.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import InputSuratForm from "@/components/InputSurat.Form.tsx";

export default function InputSurat() {
  const [bidangList, setBidangList] = useState<Bagian[]>([])
  const [ekspedisiList, setEkspedisiList] = useState<Ekspedisi[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const {toast} = useToast();

  useEffect(() => {
    getBagianAndEkspedisi()
      .then((data) => {
        setBidangList(data.bagianList)
        setEkspedisiList(data.ekspedisiList)
      })
      .catch(e => {
        toast({
          variant: "destructive",
          description: e
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return isLoading ?
    <Loading/>
    : (
    <div className={"flex flex-col gap-3"}>
      <TitlePage title={"Input Surat"}/>
      <Separator className={"mb-4"}/>
      <InputSuratForm bidangList={bidangList} ekspedisiList={ekspedisiList}/>
    </div>
  )
}