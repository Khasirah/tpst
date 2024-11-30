import {PosisiSurat} from "@/model/PosisiSurat.tsx";

export type ForListSuratResponse = {
  idSurat: number,
  nomorSurat: string,
  namaPengirim: string,
  perihal: string,
  tanggalTerima: string,
  idPetugasTpst: string,
  namaPetugasTpst: string
  posisiSurat: PosisiSurat
}