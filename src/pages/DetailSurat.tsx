import TitlePage from "@/components/TitlePage.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {SuratResponse} from "@/model/response/SuratResponse.tsx";
import {getSuratById, handleUploadBerkas} from "@/api/Surat.tsx";
import {Loading} from "@/components/Loading.tsx";
import DetailSuratTable from "@/components/DetailSurat.Table.tsx";
import {useToast} from "@/hooks/use-toast.ts";

function DetailSurat() {
  const {idSurat} = useParams<{idSurat: string}>();
  const [surat, setSurat] = useState<SuratResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {toast} = useToast();

  function onUploadHandler(pdfFile: File) {
    setIsLoading(true)
    handleUploadBerkas(
      parseInt(idSurat as string),
      pdfFile
    ).then(response => {
      toast({
        description: response
      })
      if (idSurat != null) {
        getSuratById(parseInt(idSurat))
          .then(response => {
            setSurat(response)
          }).catch(e => {
          toast({
            variant: "destructive",
            description: e
          })
        })
      }
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
  }

  useEffect(() => {
    if (idSurat) {
      getSuratById(parseInt(idSurat))
        .then(response => {
          setSurat(response)
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
    }
  }, [isLoading]);

  return (
    <div className={"flex flex-col gap-3"}>
      <TitlePage title={"Detail Surat"}/>
      <Separator className={"mb-4"}/>
      <div>
        {
          isLoading
            ? <Loading/>
            : <DetailSuratTable surat={surat as SuratResponse} uploadHandler={onUploadHandler}/>
        }
      </div>
    </div>
  )
}

export default DetailSurat;