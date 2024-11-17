import {PagingResponse} from "@/model/response/PagingResponse.tsx";

export type WebResponse<T> = {
  data: T,
  errors: string,
  paging: PagingResponse
}