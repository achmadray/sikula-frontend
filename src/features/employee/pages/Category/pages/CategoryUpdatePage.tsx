import { useNavigate, useLocation } from "react-router-dom";
import { Text, Paper, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CategoryType } from "../types";
import { useUpdateCategory } from "../api";

export const CategoryUpdatePage = () => {
  const location = useLocation();
  const category = location.state.category as CategoryType;
  console.log("data kategori: ", category);
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      nama_kategori: category?.nama_kategori || "",
    },

    validate: {
      nama_kategori: (value) =>
        value.length < 2 ? "Nama kategori harus lebih dari 2 karakter" : null,
    },
  });

  const mutationUpdateCategory = useUpdateCategory();
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const CategoryData = {
      id_kategori: category.id_kategori,
      nama_kategori: form.values.nama_kategori,
    };
    await mutationUpdateCategory.mutateAsync(CategoryData, {
      onSuccess: (data) => {
        console.log("Succes:", data);
        navigate("/data_master/kategori", {});
        close();
      },
    });
  };
  if (!category) return <Text>Memuat data kategori...</Text>;

  return (
    <Paper
      shadow="md"
      radius="md"
      p="lg"
      withBorder
      className="max-w-md mx-auto mt-10 bg-white"
    >
      <Text fw={700} size="xl" mb="md">
        Edit Kategori
      </Text>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          label="Nama Kategori"
          {...form.getInputProps("nama_kategori")}
          required
        />
        <Button type="submit" color="green" mt="md">
          Simpan
        </Button>
      </form>
    </Paper>
  );
};
