import { Text, Paper, TextInput, Select, Button, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { CategoryType, useGetAllCategory } from "../../Category";
import { useAddMenu } from "../api";

export const MenuAddPage = () => {
  const navigate = useNavigate();
   const { data: categorys, isLoading: LoadingCategory } = useGetAllCategory();

  const form = useForm({
    initialValues: {
      nama_menu: "",
      id_kategori: "",
      harga: "",
    },
    validate: {
      nama_menu: (value) =>
        value.length < 2 ? "Nama Menu harus lebih dari 2 karakter" : null,
      harga: (value) =>
        value.length === 0 ? "Harga tidak boleh kosong" : null,
    },
  });

  const mutationAddMenu = useAddMenu();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const menuData = {
      nama_menu: form.values.nama_menu,
      id_kategori: parseInt(form.values.id_kategori),
      harga: parseInt(form.values.harga),
    };

    await mutationAddMenu.mutateAsync(menuData, {
      onSuccess: (data) => {
        console.log("Success:", data);
        navigate("/data_master/menu");
      },
    });
  };

  if (LoadingCategory) {
    return <Loader />;
  }

  return (
    <Paper
      shadow="md"
      radius="md"
      p="lg"
      withBorder
      className="max-w-md mx-auto mt-10 bg-white"
    >
      <Text fw={700} size="xl" mb="md">
        Tambah Menu
      </Text>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          label="Nama Menu"
          {...form.getInputProps("nama_menu")}
          required
        />
        <Select
          label="Category"
          {...form.getInputProps("id_kategori")}
          data={categorys?.map((category: CategoryType) => ({
            value: category.id_kategori.toString(),
            label: category.nama_kategori,
          }))}
          required
        />
        <TextInput label="Harga" {...form.getInputProps("harga")} required />
        <Button type="submit" color="green" mt="md">
          Simpan
        </Button>
      </form>
    </Paper>
  );
};
