import {TOKEN_KEY} from "@/config/config.tsx";
import {WebResponse} from "@/model/response/WebResponse.tsx";
import {TokenResponse} from "@/model/response/TokenResponse.tsx";
import {getDayName} from "@/model/DaysName.tsx";
import {getMonthName} from "@/model/MonthName.tsx";

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
  const arr = name.split(" ").slice(0, 2)
  let result: string = ""

  arr.forEach((item) => {
    result = result + item[0]
  })

  return result.toUpperCase()
}

export function isAdmin(role: string): boolean {
  return role === "admin";
}

export function generateDateFormat(date: string) {
  const newDate = new Date(date)

  return `${getDayName(newDate.getDay())}, ${newDate.getDate()} ${getMonthName(newDate.getMonth())}
   ${newDate.getFullYear()}, ${newDate.toLocaleTimeString()}`
}

export function createATag(blob: Blob, fileName: string) {
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}