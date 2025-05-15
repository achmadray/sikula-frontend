import { useNavigate } from "react-router-dom";
import {
  IconBox,
  IconRulerMeasure,
  IconCategory2,
  IconListDetails,
  IconArrowLeft,
  IconUserSquare,
} from "@tabler/icons-react";

const masterMenus = [
  {
    title: "Data Satuan",
    path: "/data_master/satuan",
    icon: <IconRulerMeasure size={32} className="text-sky-600" />,
  },
  {
    title: "Data Kategori",
    path: "/data_master/kategori",
    icon: <IconCategory2 size={32} className="text-purple-600" />,
  },
  {
    title: "Data Menu",
    path: "/data_master/menu",
    icon: <IconListDetails size={32} className="text-green-600" />,
  },
  {
    title: "Data Barang",
    path: "/data_master/barang",
    icon: <IconBox size={32} className="text-indigo-600" />,
  },
  {
    title: "Data Suplier",
    path: "/data_master/suplier",
    icon: <IconUserSquare size={32} className="text-indigo-600" />,
  },
];

const CardLink = ({
  title,
  href,
  icon,
}: {
  title: string;
  href: string;
  icon: JSX.Element;
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(href)}
      className="cursor-pointer flex items-center gap-4 p-5 border border-gray-200 rounded-xl bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="p-3 rounded-full bg-gray-100">{icon}</div>
      <h3 className="text-lg font-medium text-gray-800">{title}</h3>
    </div>
  );
};

export const DataMasterPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sky-600 hover:underline font-medium"
        >
          <IconArrowLeft size={20} />
          Kembali ke Beranda
        </button>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
        Data Master
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {masterMenus.map((menu) => (
          <CardLink
            key={menu.path}
            title={menu.title}
            href={menu.path}
            icon={menu.icon}
          />
        ))}
      </div>
    </main>
  );
};
