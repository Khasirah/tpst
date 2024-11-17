import {Bagian} from "@/model/Bagian.tsx";
import {Kelompok} from "@/model/Kelompok.tsx";

export type UserResponse = {
  idUser: string,
  namaUser: string,
  bagian: Bagian,
  kelompok: Kelompok
}