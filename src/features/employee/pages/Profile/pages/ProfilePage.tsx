import { useEffect, useState } from "react";
import { IconBriefcase, IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ProfileMenu } from "../components";
import { getPenggunaByAkunId } from "../api/getPengguna";

interface Pengguna {
  id_pengguna: number;
  nama_pengguna: string;
  email: string;
  no_telpon: string | null;
  akun: {
    id_akun: number;
    level: string;
  };
}

export const ProfilePage: React.FC = () => {
  const [pengguna, setPengguna] = useState<Pengguna | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null);  
  const navigate = useNavigate();

  const idAkun = 1;  // Atau id pengguna yang login (sebaiknya ambil dari token atau konteks global)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPenggunaByAkunId(idAkun);  
        setPengguna(data);
      } catch (err) {
        setError("Gagal mengambil data pengguna.");
        console.error("Gagal mengambil data pengguna:", err);
      } finally {
        setIsLoading(false);  
      }
    };

    fetchData();
  }, [idAkun]);

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;  
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;  
  }

  if (!pengguna) {
    return <div className="text-center mt-8">User not found</div>;  
  }

  return (
    <main>
      <section className="flex m-3 shadow-md rounded-xl gap-4 items-center p-4 bg-white mt-15">
        <div className="bg-slate-500 text-white rounded-full p-4">
          <IconUser className="w-10 h-10" />
        </div>
        <div className="font-bold text-lg">
          {pengguna.nama_pengguna} 
          <div className="text-sm text-gray-600 flex gap-1 items-center">
            <IconBriefcase size={20} />
            <span className="font-semibold capitalize">
              {pengguna.akun.level} 
            </span>
          </div>
        </div>
      </section>

      <ProfileMenu />
    </main>
  );
};
