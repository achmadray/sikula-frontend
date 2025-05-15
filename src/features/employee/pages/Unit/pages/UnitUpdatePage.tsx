import { useNavigate, useLocation } from "react-router-dom";
import { Text, Paper, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUpdateUnit } from "../api/updateUnit";
import { UnitType } from "../types";

export const UnitUpdatePage = () => {
  const location = useLocation();
  const unit = location.state.unit as UnitType;
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      ...unit,
    },
    validate: {
      nama_satuan: (value) =>
        value.length < 3 ? "Nama satuan harus lebih dari 2 karakter" : null,
    },
  });

  const mutationUpdateUnit = useUpdateUnit();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const unitData = {
      id_satuan: form.values.id_satuan,
      nama_satuan: form.values.nama_satuan,
    };

    await mutationUpdateUnit.mutateAsync(unitData, {
      onSuccess: (data) => {
        console.log("Success:", data);
        navigate("/data_master/satuan");
      },
    });
  };

  if (!unit) return <Text>Memuat data unit...</Text>;

  return (
    <Paper shadow="md" radius="md" p="lg" withBorder className="max-w-md mx-auto mt-10 bg-white">
      <Text fw={700} size="xl" mb="md">Edit Unit</Text>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          label="Nama Satuan"
          {...form.getInputProps("nama_satuan")}
          required
        />
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
