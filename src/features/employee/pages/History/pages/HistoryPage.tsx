import { DailyRecapCard, HistoryMenu } from "../components";

export const HistoryPage: React.FC = () => {
  return (
    <main className="w-full">
      <section className="h-20 bg-sky-400 rounded-b-3xl" />
      <div className="mt-4">
        <DailyRecapCard />
      </div>
      <div className="mt-6 px-4">
        <HistoryMenu />
      </div>
    </main>
  );
};
