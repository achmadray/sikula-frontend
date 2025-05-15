import { useNavigate } from "react-router-dom";
import {
  Text,
  Paper,
  TextInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAddSuplier } from "../api";

export const SuplierAddPage = () => {
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      nama_suplier: "",
      alamat: "",
      no_telpon: "",
    },
    validate: {
      nama_suplier: (value) =>
        value.length < 3 ? "Username must have at least 3 letters" : null,
      alamat: (value) =>
        value.length < 5 ? "Level must have at least 5 letters" : null,
      no_telpon: (value) =>
        value.length < 12 ? "Password must have at least 12 letters" : null,
    },
  });
  const mutationAddSuplier = useAddSuplier();
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const SuplierData = {
      nama_suplier: form.values.nama_suplier,
      alamat: form.values.alamat,
      no_telpon: form.values.no_telpon,
    };

    console.log(SuplierData);
    await mutationAddSuplier.mutateAsync(SuplierData, {
      onSuccess: (data) => {
        console.log("Succes:", data);
        navigate("/data_master/suplier", {});
        close();
      },
    });
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
        Tambah Suplier
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
      </form>
    </Paper>
  );
};
