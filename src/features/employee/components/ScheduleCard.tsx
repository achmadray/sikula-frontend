/* eslint-disable @typescript-eslint/no-unused-vars */
import { Divider, Text } from "@mantine/core";
import {
  IconPackageImport,
  IconPackageExport,
  IconCashRegister,
} from "@tabler/icons-react";

export const ScheduleCard: React.FC = () => {
  return (
    <section className="mx-auto max-w-xs bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2 -mt-16">
      <div className="text-center">
        <Text size="lg" fw={700} className="mb-2">
          Stok dan Pendapatan
        </Text>
        <Divider size={"sm"} />

        <div className="grid grid-cols-2 text-xs p-2">
          <div className="flex gap-2">
            <IconPackageImport size={15} className="text-teal-400" /> Stok Masuk
            : 20 Porsi
          </div>
          <div className="ps-3 flex gap-2">
            <IconPackageExport size={15} className="text-rose-400" /> Stok
            Keluar : 10 Porsi
          </div>
        </div>

        <Divider size={"sm"} />

        <div className="grid grid-cols-1 text-xs p-2">
          <div className="flex gap-2">
            <IconCashRegister size={15} className="text-teal-400" /> Pendapatan
            : Rp 150.000
          </div>
        </div>
      </div>
    </section>
  );
};
