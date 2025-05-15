import { useNavigate, useLocation } from "react-router-dom";
import { Text, Paper, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SuplierType } from "../types";
import { useUpdateSuplier } from "../api";

export const SuplierUpdatePage = () => {
  const location = useLocation();
  const suplier = location.state.suplier as SuplierType;
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      ...suplier,
    },
    validate: {
      nama_suplier: (value) =>
        value.length < 5 ? "Nama Suplier must have at least 5 letters" : null,
      alamat: (value) =>
        value.length < 5 ? "Level must have at least 5 letters" : null,
      no_telpon: (value) =>
        value.length < 13 ? "Password must have at least 13 letters" : null,
    },
  });
  const mutationUpdateSuplier = useUpdateSuplier();
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const SuplierData = {
      id_suplier: form.values.id_suplier,
      nama_suplier: form.values.nama_suplier,
      alamat: form.values.alamat,
      no_telpon: form.values.no_telpon,
    };
    await mutationUpdateSuplier.mutateAsync(SuplierData, {
      onSuccess: (data) => {
        console.log("Succes:", data);
        navigate("/data_master/suplier", {});
        close();
      },
    });
  };
  if (!suplier) return <Text>Memuat data suplier...</Text>;

  return (
    <Paper
      shadow="md"
      radius="md"
      p="lg"
      withBorder
      className="max-w-md mx-auto mt-10 bg-white"
    >
      <Text fw={700} size="xl" mb="md">
        Edit Suplier
      </Text>

      <form onSubmit={handleFormSubmit}>
        <TextInput
          label="Nama Suplier"
          {...form.getInputProps("nama_suplier")}
          required
        />
        <TextInput label="Alamat" {...form.getInputProps("alamat")} required />
        <TextInput label="No Telpon" {...form.getInputProps("no_telpon")} />
        <Button type="submit" color="green" mt="md">
          Simpan
        </Button>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          color="red"
          mt="md"
        >
          Kembali
        </Button>
      </form>
    </Paper>
  );
};
