import { PenggunaType } from "../../Profile/types";

export type TransaksiType = {
  id_transaksi: number;
  id_pengguna: number;
  no_urut: string;
  nama_order: string;
  metode_pembayaran: string;
  total_transaksi: number;
  tanggal_transaksi: string;
  status_pembayaran: string;

  pengguna: PenggunaType;
};
