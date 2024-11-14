import {ErrorMessages} from "@/model/ErrorMessages.tsx";
import {WebResponse} from "@/model/WebResponse.tsx";
import {TokenResponse} from "@/model/TokenResponse.tsx";
import {LoginField} from "@/types/LoginSchema.tsx";
import {saveToken} from "@/utils/Helper.tsx";
import {API_URL, TOKEN_KEY} from "@/config/config.tsx";

export async function login(request: LoginField): Promise<WebResponse<TokenResponse>>{
  const url: string = API_URL + "/api/auth/login"
  const options: object = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(request)
  }

  const response: Response= await fetch(url, options);
  if (!response.ok) throw ErrorMessages.loginFailed;
  const data: WebResponse<TokenResponse> = await response.json();
  saveToken(data)
  return data;
}

export async function logout(token: string) {
  const url: string = API_URL + "/api/auth/logout"
  const options: object = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "X-API-TOKEN": token
    }
  }
  const response: Response = await fetch(url, options)
  if (!response.ok) throw ErrorMessages.notLogin
  localStorage.removeItem(TOKEN_KEY)
}

