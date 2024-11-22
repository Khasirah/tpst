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

type SearchUserParam = {
  idUser: string | null
  namaUser: string | null
  page: number | 0
  size: number | 20
}

export async function searchUser(
  {
    idUser,
    namaUser,
    page = 0,
    size = 20
  }: SearchUserParam
) {
  const param = new URLSearchParams({
    "idUser": idUser ? idUser : "",
    "namaUser": namaUser ? namaUser: "",
    "page": page.toString(),
    "size": size.toString()
  })

  const url: string = API_URL+`/api/users?${param}`
  const options: object = {
    method: "GET",
    headers: {
      "X-API-TOKEN": getToken()
    },
  }
  const response = await fetch(url, options)
  if (!response.ok) {
    const data: WebResponse<null> = await response.json()
    throw data.errors
  }
  const data: WebResponse<UserResponse[]> = await response.json()
  return {data}
}

export async function deleteUser(idUser: string): Promise<string> {
  const url: string = API_URL+`/api/users/${idUser}`
  const options: object = {
    method: "DELETE",
    headers: {
      "X-API-TOKEN": getToken()
    },
  }
  
  const response = await fetch(url, options)
  if (!response.ok) {
    const data: WebResponse<null> = await response.json()
    throw data.errors
  }
  const data: WebResponse<string> = await response.json()
  return data.data
}