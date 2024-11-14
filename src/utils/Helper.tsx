import {TOKEN_KEY} from "@/config/config.tsx";
import {WebResponse} from "@/model/WebResponse.tsx";
import {TokenResponse} from "@/model/TokenResponse.tsx";

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