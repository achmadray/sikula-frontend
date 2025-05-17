import { ProductType } from "../../Product/types";
import { PenggunaType } from "../../Profile/types";

export type ProductOutType = {
  id_barang_keluar: number;
  id_barang: number;
  id_pengguna: number;
  catatan: string;
  jumlah: string;
  stok_keluar: string;
  tanggal_keluar: string;

  barang: ProductType;
  pengguna: PenggunaType;
};
