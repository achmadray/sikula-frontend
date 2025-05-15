import {
  IconPackageImport,
  IconPackageExport,
  IconUsers,
  IconClipboardList,
  IconBrandDatabricks,
} from "@tabler/icons-react";
import { ScheduleCard } from "../components";
import { MenuList } from "@/components/navigation";

const navigations = [
  {
    title: "Barang Masuk",
    href: "/barang_masuk",
    icon: IconPackageImport,
    color: "bg-teal-600",
  },
  {
    title: "Barang Keluar",
    href: "/barang_keluar",
    icon: IconPackageExport,
    color: "bg-rose-600",
  },
  {
    title: "Akun",
    href: "/akun",
    icon: IconUsers,
    color: "bg-yellow-600",
  },
  {
    title: "Detail Transaksi",
    href: "/detail-transaksi",
    icon: IconClipboardList,
    color: "bg-pink-600",
  },
  {
    title: "Data Master",
    href: "/data_master",
    icon: IconBrandDatabricks,
    color: "bg-sky-600",
    submenu: [
      {
        title: "Barang",
        href: "/data_master/barang",
      },
      {
        title: "Satuan",
        href: "/data_master/satuan",
      },
      {
        title: "Kategori",
        href: "/data_master/kategori",
      },
      {
        title: "Menu",
        href: "/data_master/menu",
      },
    ],
  },
];

export const Home: React.FC = () => {
  return (
    <main>
      <section className="bg-sky-400 w-full rounded-b-3xl px-5 pt-8 pb-20 relative">
        <img
          src="../images/making presentations.svg"
          className="absolute w-32 right-5 top-1 opacity-85"
          alt="Ilustrasi Dashboard"
        />
        <div className="grid grid-cols-15">
          <div className="col-span-2" />
          <div className="col-span-10">
            <div className="text-black text-2xl font-bold relative z-10">
              KulaKita
            </div>
            <div className="text-sm font-semibold text-black">
              Stok Barang & Kasir
            </div>
            <div className="absolute right-5 top-5">
              <img src="/images/white-logo.png" alt="" className="w-14" />
            </div>
          </div>
        </div>
      </section>

      <ScheduleCard />

      <section className="px-7 mt-5 mb-[-110px]">
        <MenuList navigations={navigations} />
      </section>
    </main>
  );
};
