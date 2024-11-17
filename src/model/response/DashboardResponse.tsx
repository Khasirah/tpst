import {ForListSuratResponse} from "@/model/response/ForListSuratResponse.tsx";

export type DashboardResponse = {
  totalSuratMasuk: number,
  totalSuratAtTPST: number,
  totalPetugas: number,
  totalSuratByPetugasTPST: number,
  newestSuratInbound: ForListSuratResponse[]
}