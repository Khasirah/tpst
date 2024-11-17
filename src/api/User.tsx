import {API_URL} from "@/config/config.tsx";
import {WebResponse} from "@/model/response/WebResponse.tsx";
import {UserResponse} from "@/model/response/UserResponse.tsx";
import {getToken} from "@/utils/Helper.tsx";

export async function getCurrentUser() {

  const url: string = API_URL+"/api/users/current"
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
  const data: WebResponse<UserResponse> = await response.json()
  return data.data
}