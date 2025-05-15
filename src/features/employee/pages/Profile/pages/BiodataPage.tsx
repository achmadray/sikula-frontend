import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPenggunaByAkunId } from "../api/getPengguna";
import { Button, Paper, Text, Title } from "@mantine/core";
import { PenggunaType } from "../types";

export const BiodataPage: React.FC = () => {
  const navigate = useNavigate();
  const [pengguna, setPengguna] = useState<PenggunaType>();
  const { data: DataPengguna } = useGetPenggunaByAkunId(1);
  useEffect(() => {
    if (DataPengguna) {
      setPengguna(DataPengguna);
    }
  }, [DataPengguna]);
  console.log("Pengguna yang login : ", pengguna);

  return (
    <main className="p-4">
      <Paper
        shadow="sm"
        radius="md"
        p="lg"
        className="max-w-lg mx-auto bg-white"
      >
        <Title order={2} className="text-center mb-6">
          Biodata Pengguna
        </Title>

        <div className="mb-4 border-b border-gray-300 pb-4">
          <Text className="font-medium">Nama</Text>
          <Text>{pengguna?.nama_pengguna}</Text>
        </div>

        <div className="mb-4 border-b border-gray-300 pb-4">
          <Text className="font-medium">Email</Text>
          <Text>{pengguna?.email}</Text>
        </div>

        <div className="mb-4 border-b border-gray-300 pb-4">
          <Text className="font-medium">Nomor Telepon</Text>
          <Text>{pengguna?.no_telpon || "Tidak ada"}</Text>
        </div>

        <div className="flex justify-between gap-4">
          <Button
            onClick={() =>
              navigate(`/profile/biodata/update/`, {
                state: {pengguna}
              })
            }
            fullWidth
            color="blue"
          >
            Edit
          </Button>
          <Button onClick={() => navigate(-1)} fullWidth color="red">
            Kembali
          </Button>
        </div>
      </Paper>
    </main>
  );
};
