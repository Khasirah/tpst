
export interface UpdateSpecificUserRequest {
  idUser: string;
  namaUser: string;
  password: string | null;
  idBagian: number;
  idKelompok: number;
}