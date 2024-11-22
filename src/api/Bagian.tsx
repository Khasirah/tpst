import {WebResponse} from "@/model/response/WebResponse.tsx";
import {API_URL} from "@/config/config.tsx";
import {getToken} from "@/utils/Helper.tsx";
import {Bagian} from "@/model/Bagian.tsx";

export async function getAllBagian(): WebResponse<Bagian[]> {

  const url: string = API_URL + "/api/kelompok"
  const options: object = {
    method: "GET",
    headers: {
      "X-API-TOKEN": getToken()
    },
  }

  const response = await fetch(url, options)
  if (!response.ok) {
    const errors: WebResponse<null> = await response.json()
    throw errors.errors
  }

  return await response.json();
}