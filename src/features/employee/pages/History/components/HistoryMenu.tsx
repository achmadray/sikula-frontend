import {
  IconPackageImport,
  IconPackageExport,
  IconCashRegister,
  IconChevronRight,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const HistoryMenu: React.FC = () => {
  return (
    <section className="p-2 flex flex-col gap-3 text-slate-600 mx-3 mt-4">
      <h4 className="text-brown font-bold text-[15px]">
        Riwayat Data :
      </h4>
      <Link
        to="/barang_masuk/history"
        className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm"
      >
        <div className="flex gap-3 items-center">
          <IconPackageImport size={25} className="text-brown" />
          <div>
            <span className="font-semibold">Riwayat Barang Masuk</span>
            <p className="text-xs text-slate-400">
              Daftar barang masuk yang telah dicatat
            </p>
          </div>
        </div>
        <IconChevronRight className="text-brown" size={25} />
      </Link>
      <Link
        to="/barang_keluar/history"
        className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm"
      >
        <div className="flex gap-3 items-center">
          <IconPackageExport size={25} className="text-brown" />
          <div>
            <span className="font-semibold">Riwayat Barang Keluar</span>
            <p className="text-xs text-slate-400">
              Daftar barang keluar yang telah dicatat
            </p>
          </div>
        </div>
        <IconChevronRight className="text-brown" size={25} />
      </Link>

      {/* Riwayat Transaksi */}
      <Link
        to="/history/transaksi"
        className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between text-sm"
      >
        <div className="flex gap-3 items-center">
          <IconCashRegister size={25} className="text-brown" />
          <div>
            <span className="font-semibold">Riwayat Transaksi</span>
            <p className="text-xs text-slate-400">
              Riwayat transaksi penjualan di kasir
            </p>
          </div>
        </div>
        <IconChevronRight className="text-brown" size={25} />
      </Link>
    </section>
  );
};
