import {API_URL} from "@/config/config.tsx";
import {ErrorMessages} from "@/model/ErrorMessages.tsx";
import {WebResponse} from "@/model/WebResponse.tsx";
import {UserResponse} from "@/model/UserResponse.tsx";
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
  if (!response.ok) throw ErrorMessages.userNotExist
  const data: WebResponse<UserResponse> = await response.json()
  return data.data
}