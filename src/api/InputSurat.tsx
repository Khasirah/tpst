import {WebResponse} from "@/model/response/WebResponse.tsx";
import {BagianAndEkspedisiResponse} from "@/model/response/BagianAndEkspedisiResponse.tsx";
import {API_URL} from "@/config/config.tsx";
import {getToken} from "@/utils/Helper.tsx";

export async function getBagianAndEkspedisi() {

  const url: string = API_URL+"/api/inputSurat/bagianAndEkspedisi"
  const options: object = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "X-API-TOKEN": getToken()
    },
  }

  const response = await fetch(url, options)
  if (!response.ok) {
    const data: WebResponse<null> = await response.json()
    throw data.errors
  }
  const data: WebResponse<BagianAndEkspedisiResponse> = await response.json()
  return data.data
}