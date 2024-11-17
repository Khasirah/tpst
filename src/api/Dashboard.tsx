import {API_URL} from "@/config/config.tsx";
import {getToken} from "@/utils/Helper.tsx";
import {WebResponse} from "@/model/response/WebResponse.tsx";
import {DashboardResponse} from "@/model/response/DashboardResponse.tsx";

export async function getDashboard() {

  const url: string = API_URL+"/api/dashboard"
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
  const data: WebResponse<DashboardResponse> = await response.json()
  return data.data
}