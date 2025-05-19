import { MenuType } from "../../Menu";
import { TransaksiType } from "../../Transaction";

export type DetailType = {
  id_detail_transaksi: number;
  id_transaksi: number;
  id_menu: number;
  jumlah: string;
  total_harga: number;

  transaksi: TransaksiType;
  menu: MenuType;
};
