import {PagingResponse} from "@/model/PagingResponse.tsx";

export type WebResponse<T> = {
  data: T,
  errors: string,
  paging: PagingResponse
}