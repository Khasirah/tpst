import {PosisiSurat} from "@/model/PosisiSurat.tsx";

export type SuratResponse = {
  id: number
  nomorSurat: string
  namaPengirim: string
  perihal: string
  namaBagian: string
  posisiSurat: PosisiSurat
  namaEkspedisi: string
  nomorSeriEkspedisi: string
  kontak: string
  namaPetugasTpst: string
  tanggalTerimaBidang: string
  penerimaBagian: string
  namaBerkas: string
  status: string
  tanggalTerimaSurat: string
}