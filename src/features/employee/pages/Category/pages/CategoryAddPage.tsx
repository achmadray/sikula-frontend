import { useNavigate } from "react-router-dom";
import { Text, Paper, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAddCategory } from "../api/addCategory";

export const CategoryAddPage = () => {
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      nama_kategori: "",
    },
    validate: {
      nama_kategori: (value) =>
        value.length < 3 ? "Nama kategori minimal 3 huruf" : null,
    },
  });

  const mutationAddCategory = useAddCategory();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const categoryData = {
      nama_kategori: form.values.nama_kategori,
    };

    console.log("Data kategori:", categoryData);

    await mutationAddCategory.mutateAsync(categoryData, {
      onSuccess: (data) => {
        console.log("Kategori berhasil ditambahkan:", data);
        navigate("/data_master/kategori");
      },
    });
  };

  return (
    <div className="p-2">
      <Paper
        shadow="md"
        radius="md"
        withBorder
        p="lg"
        className="max-w-md mx-auto mt-10 bg-white"
      >
        <Text fw={700} size="xl" mb="md">
          Tambah Kategori
        </Text>
        <form onSubmit={handleFormSubmit}>
          <TextInput
            label="Nama Kategori"
            placeholder="Masukkan nama kategori"
            {...form.getInputProps("nama_kategori")}
            required
          />
          <Button type="submit" color="green" mt="md">
            Simpan
          </Button>
        </form>
      </Paper>
    </div>
  );
};
