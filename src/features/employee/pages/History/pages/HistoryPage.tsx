import { DailyRecapCard, HistoryMenu } from "../components";

export const HistoryPage: React.FC = () => {
  return (
    <main className="w-full">
      {/* Header Section */}
      <section className="h-20 bg-sky-400 rounded-b-3xl" />

      {/* Rekapitulasi Harian */}
      <div className="mt-4">
        <DailyRecapCard />
      </div>

      {/* Menu Riwayat */}
      <div className="mt-6 px-4">
        <HistoryMenu />
      </div>
    </main>
  );
};
