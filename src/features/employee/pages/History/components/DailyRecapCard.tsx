import { Divider, Text, SegmentedControl } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const DailyRecapCard: React.FC = () => {
  const [filter, setFilter] = useState<"Harian" | "Mingguan" | "Bulanan">(
    "Harian"
  );

  const data = {
    Harian: { masuk: 6, keluar: 4, transaksi: 2 },
    Mingguan: { masuk: 35, keluar: 27, transaksi: 12 },
    Bulanan: { masuk: 108, keluar: 91, transaksi: 43 },
  };

  return (
    <section className="bg-white mx-auto max-w-xs w-full -mt-10 shadow-lg rounded-xl z-50 relative p-2 text-slate-700">
      <div className="divide-y divide-gray-300">
        {/* Header */}
        <div className="flex justify-between text-xs items-center p-2">
          <Text fw={700} c="#654433">
            Rekap Stok {filter}
          </Text>
          <IconCalendar size={22} color="#654433" />
        </div>

        {/* Filter Tabs */}
        <div className="px-2 pt-2">
          <SegmentedControl
            fullWidth
            value={filter}
            onChange={(val) =>
              setFilter(val as "Harian" | "Mingguan" | "Bulanan")
            }
            data={["Harian", "Mingguan", "Bulanan"]}
            color="brown"
            radius="xl"
            size="xs"
          />
        </div>

        <Divider className="mt-2" />

        {/* Konten */}
        <div className="w-full grid grid-cols-5 pb-2 pt-2">
          {/* Barang Masuk */}
          <Link
            to="/history/barang-masuk"
            className="px-4 flex flex-col items-center justify-center ml-3"
          >
            <div className="p-2 text-green-600 text-2xl font-bold w-full text-center">
              {data[filter].masuk}
            </div>
            <div className="text-xs -mt-1 ml-1">Masuk</div>
          </Link>

          <Divider className="flex flex-col mx-auto" orientation="vertical" />

          {/* Barang Keluar */}
          <Link
            to="/history/barang-keluar"
            className="px-4 flex flex-col items-center justify-center"
          >
            <div className="p-2 text-red-600 text-2xl font-bold w-full text-center">
              {data[filter].keluar}
            </div>
            <div className="text-xs -mt-1">Keluar</div>
          </Link>

          <Divider className="flex flex-col mx-auto" orientation="vertical" />

          {/* Transaksi */}
          <Link
            to="/history/transaksi"
            className="px-4 flex flex-col items-center justify-center mr-3 -ml-2"
          >
            <div className="p-2 text-blue-600 text-2xl font-bold w-full text-center">
              {data[filter].transaksi}
            </div>
            <div className="text-xs -mt-1 ml-2">Transaksi</div>
          </Link>
        </div>

        <Divider className="mb-4" />
      </div>
    </section>
  );
};
