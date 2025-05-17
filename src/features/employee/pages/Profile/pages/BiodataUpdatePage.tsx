import { useNavigate, useLocation } from "react-router-dom";
import { Text, Paper, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUpdatePengguna } from "../api/updatePengguna";
import { PenggunaType } from "../types";

export const BiodataUpdatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pengguna = location.state?.pengguna as PenggunaType;
  console.log("Data pengguna :", pengguna);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: pengguna || {
      nama_pengguna: "",
      email: "",
      no_telpon: "",
      id_akun: "",
    },
    validate: {
      nama_pengguna: (value) =>
        value.length < 3 ? "Nama harus lebih dari 3 karakter" : null,
      email: (value) =>
        !/\S+@\S+\.\S+/.test(value) ? "Email tidak valid" : null,
      no_telpon: (value) =>
        value && value.length < 10 ? "Nomor Telepon terlalu pendek" : null,
    },
  });

  const mutationUpdatePengguna = useUpdatePengguna(pengguna.id_pengguna);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { id_pengguna, nama_pengguna, email, no_telpon } = form.values;
    if (!id_pengguna || !nama_pengguna || !email) {
      console.error("Data form tidak lengkap:", form.values);
      alert("Data yang dimasukkan tidak lengkap.");
      return;
    }

    const penggunaData: PenggunaType = {
      id_pengguna: form.values.id_pengguna,
      nama_pengguna: form.values.nama_pengguna,
      email: form.values.email,
      no_telpon: form.values.no_telpon || "",
      id_akun: form.values.id_akun,
    };

    console.log("Data yang akan diperbarui:", penggunaData);

    try {
      const response = await mutationUpdatePengguna.mutateAsync(penggunaData);
      console.log("Sukses memperbarui data pengguna", response);
      navigate("/profile/biodata");
    } catch (error) {
      console.error("Gagal memperbarui pengguna:", error);
      alert("Terjadi kesalahan saat memperbarui data pengguna.");
    }
  };

  return (
    <Paper
      shadow="md"
      radius="md"
      p="lg"
      withBorder
      className="max-w-md mx-auto mt-10 bg-white"
    >
      <Text fw={700} size="xl" mb="md">
        Edit Biodata
      </Text>

      <form onSubmit={handleFormSubmit}>
        <TextInput
          label="Nama Pengguna"
          {...form.getInputProps("nama_pengguna")}
          required
        />
        <TextInput label="Email" {...form.getInputProps("email")} required />
        <TextInput label="Nomor Telepon" {...form.getInputProps("no_telpon")} />
        <Button type="submit" color="green" mt="md">
          Simpan
        </Button>
        <Button
            variant="default"
            onClick={() => navigate("/profile/biodata")}
          >
            Kembali
          </Button>
      </form>
    </Paper>
  );
};
