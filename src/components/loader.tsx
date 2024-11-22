import {SuratResponse} from "@/model/response/SuratResponse.tsx";
import {getSuratById} from "@/api/Surat.tsx";

type LoaderProp = {
  params: {
    idSurat: number
  }
}

export async function loader({params}: LoaderProp) {
  const surat: SuratResponse = await getSuratById(params.idSurat)
  return {surat};
}