import {API_URL} from "@/config/config.tsx";
import {WebResponse} from "@/model/response/WebResponse.tsx";
import {UserResponse} from "@/model/response/UserResponse.tsx";
import {getToken} from "@/utils/Helper.tsx";
import {RegisterUserRequest} from "@/model/request/RegisterUserRequest.ts";
import {UpdateSpecificUserRequest} from "@/model/request/UpdateSpecificUserRequest.ts";

export async function getCurrentUser() {

  const url: string = API_URL + "/api/users/current"
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

export async function searchUser(
  idUser: string = "",
  namaUser: string = "",
  page: number = 0,
  size: number = 20
) {
  const param = new URLSearchParams({
    "idUser": idUser ? idUser : "",
    "namaUser": namaUser ? namaUser : "",
    "page": page.toString(),
    "size": size.toString()
  })

  const url: string = API_URL + `/api/users?${param}`
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
  return data
}

export async function deleteUser(idUser: string): Promise<string> {
  const url: string = API_URL + `/api/users/${idUser}`
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

export async function registerUser(request: RegisterUserRequest) {
  const url: string = API_URL + `/api/users`
  const options: object = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-TOKEN": getToken()
    },
    body: JSON.stringify(request)
  }

  const response = await fetch(url, options)
  if (!response.ok) {
    const data: WebResponse<null> = await response.json()
    throw data.errors
  }
  const data: WebResponse<string> = await response.json()
  return data.data
}

export async function getSpecificUser(idUser: string): Promise<UserResponse> {
  const url: string = API_URL + `/api/users/${idUser}`
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
  const data: WebResponse<UserResponse> = await response.json()
  return data.data
}

export async function updateSpecificUser(request: UpdateSpecificUserRequest) {
  const url: string = API_URL + `/api/users/${request.idUser}`
  const options: object = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-API-TOKEN": getToken()
    },
    body: JSON.stringify(request)
  }

  const response = await fetch(url, options)
  if (!response.ok) {
    const data: WebResponse<null> = await response.json()
    throw data.errors
  }

  const data: WebResponse<UserResponse> = await response.json()
  return data.data
}

export async function uploadUsers(csvFile: File) {
  const url: string = API_URL + `/api/users/upload`

  const body = new FormData()
  body.append("csvFile", csvFile)

  const options: object = {
    method: "POST",
    headers: {
      "X-API-TOKEN": getToken()
    },
    body: body
  }

  const response = await fetch(url, options)
  if (!response.ok) {
    const data: WebResponse<null> = await response.json()
    throw data.errors
  }

  const data: WebResponse<string> = await response.json()
  return data.data
}