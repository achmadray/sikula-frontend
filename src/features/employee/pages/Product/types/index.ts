import { PenggunaType } from "../../Profile/types";
import { UnitType } from "../../Unit";

export type ProductType = {
  id_barang: number;
  nama_barang: string;
  id_satuan: number;
  kode_barang: string;
  id_pengguna: number;
  stok: string;
  satuan: UnitType;
  pengguna: PenggunaType;
};
