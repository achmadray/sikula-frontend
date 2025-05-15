import { useNavigate } from "react-router-dom";
import { Text, Paper, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAddUnit } from "../api/addUnit";

export const UnitAddPage = () => {
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      nama_satuan: "",
    },
    validate: {
      nama_satuan: (value) => (value.length < 3 ? "Nama satuan harus lebih dari 2 karakter" : null),
    },
  });

  const mutationAddUnit = useAddUnit();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const unitData = {
      nama_satuan: form.values.nama_satuan,
    };

    console.log(unitData);
    await mutationAddUnit.mutateAsync(unitData, {
      onSuccess: (data) => {
        console.log("Success:", data);
        navigate("/data_master/unit", {});
      },
    });
  };

  return (
    <Paper shadow="md" radius="md" p="lg" withBorder className="max-w-md mx-auto mt-10 bg-white">
      <Text fw={700} size="xl" mb="md">Tambah Unit</Text>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          label="Nama Satuan"
          {...form.getInputProps("nama_satuan")}
          required
        />
        <Button type="submit" color="green" mt="md">
          Simpan
        </Button>
      </form>
    </Paper>
  );
};
