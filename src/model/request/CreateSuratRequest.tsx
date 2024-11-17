
export type CreateSuratRequest = {
  nomorSurat: string,
  namaPengirim: string,
  perihal: string,
  idEkspedisi: number,
  nomorSeriEkspedisi: string | null,
  kontakPengirim: string | null,
  idTujuanBagian: number
}