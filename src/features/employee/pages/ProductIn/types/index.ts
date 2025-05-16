
import { ProductType } from "../../Product/types";
import { PenggunaType } from "../../Profile/types";
import { SuplierType } from "../../Suplier";

export type ProductInType = {
  id_barang_masuk: number;
  id_barang: number;
  id_suplier: number;
  id_pengguna: number;
  harga: string;
  jumlah: string;
  total_harga: string;
  stok_masuk: string;
  tanggal_masuk: string;

  suplier: SuplierType;
  barang: ProductType;
  pengguna: PenggunaType;
};
