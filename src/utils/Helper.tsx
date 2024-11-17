import {TOKEN_KEY} from "@/config/config.tsx";
import {WebResponse} from "@/model/response/WebResponse.tsx";
import {TokenResponse} from "@/model/response/TokenResponse.tsx";

export function getToken(): string {
  const token: string | null = localStorage.getItem(TOKEN_KEY)
  if (token != null) {
    return token
  }
  return ""
}

export function saveToken(response: WebResponse<TokenResponse>) {
  localStorage.setItem(TOKEN_KEY, response.data.token)
}

export function generatePhotoProfile(name: string) {
  const arr = name.split(" ").slice(0,2)
  let result: string = ""

  arr.forEach((item) => {
    result = result+item[0]
  })

  return result.toUpperCase()
}