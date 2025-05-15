import { PenggunaType } from "../../Profile/types";
import { ProductType } from "../../Product/types";

export type ProductInType = {
  id_barang_masuk: number;
  id_barang: number;
  id_suplier: number;
  id_pengguna: number;
  harga: string;
  total_harga: string;
  stok_masuk: string;
  tanggal_masuk: string;

  suplier: SuplierType;
  product: ProductType;
  pengguna: PenggunaType;
};
