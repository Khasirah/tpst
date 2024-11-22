import {API_URL} from "@/config/config.tsx";
import {getToken} from "@/utils/Helper.tsx";
import {CreateSuratRequest} from "@/model/request/CreateSuratRequest.tsx";
import {WebResponse} from "@/model/response/WebResponse.tsx";
import {ForListSuratResponse} from "@/model/response/ForListSuratResponse.tsx";
import {SuratResponse} from "@/model/response/SuratResponse.tsx";
import {UpdateSuratRequest} from "@/model/request/UpdateSuratRequest.tsx";

export async function createSurat(
  request: CreateSuratRequest,
  pdfFile: File | null
) {
  const body = new FormData()
  body.append("data", new Blob(
    [JSON.stringify(request)],
    {
      type: "application/json"
    }))
  if (pdfFile != null) {
    body.append("pdfFile", pdfFile)
  }

  const url: string = API_URL + "/api/surat";
  const options: object = {
    method: "POST",
    headers: {
      "X-API-TOKEN": getToken()
    },
    body: body,
  };

  const response = await fetch(url, options)
  if (!response.ok) {
    const error: WebResponse<null> = await response.json()
    throw error.errors
  }
  const data: WebResponse<string> = await response.json()
  return data
}

export async function listSuratByYear(year: number) {

  const url: string = API_URL + `/api/surat?tahun=${year}`;
  const options: object = {
    method: "GET",
    headers: {
      "X-API-TOKEN": getToken()
    }
  };

  const response = await fetch(url, options)
  if (!response.ok) {
    const error: WebResponse<null> = await response.json()
    throw error.errors
  }
  const data: WebResponse<ForListSuratResponse[]> = await response.json()
  return data.data
}

export async function getSuratById(idSurat: number): Promise<SuratResponse> {

  const url: string = API_URL + `/api/surat/${idSurat}`;
  const options: object = {
    method: "GET",
    headers: {
      "X-API-TOKEN": getToken()
    }
  };

  const response = await fetch(url, options)
  if (!response.ok) {
    const error: WebResponse<null> = await response.json()
    throw error.errors
  }
  const data: WebResponse<SuratResponse> = await response.json()
  return data.data
}

export async function updateSurat(
  idSurat: number,
  pdfFile: File | null,
  reqeust: UpdateSuratRequest | null
): Promise<string> {

  const body = new FormData()

  if (pdfFile != null) {
    body.append("pdfFile", pdfFile)
  }

  if (reqeust != null) {
    body.append("data", new Blob(
      [JSON.stringify(reqeust)],
      {
        type: "application/json"
      }
    ))
  }

  const url: string = API_URL + `/api/surat/${idSurat}`
  const options: object = {
    method: "POST",
    headers: {
      "X-API-TOKEN": getToken()
    },
    body: body
  }

  const response = await fetch(url, options)
  if(!response.ok) {
    const error: WebResponse<null> = await response.json()
    throw error.errors
  }
  const data: WebResponse<string> = await response.json()
  return data.data;
}

export async function deleteSurat(idSurat: number): Promise<string> {

  const url: string = API_URL + `/api/surat/${idSurat}`;
  const options: object = {
    method: "DELETE",
    headers: {
      "X-API-TOKEN": getToken()
    }
  };

  const response = await fetch(url, options)
  if (!response.ok) {
    const error: WebResponse<null> = await response.json()
    throw error.errors
  }
  const data: WebResponse<string> = await response.json()
  return data.data
}