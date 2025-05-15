import { useNavigate, useLocation } from "react-router-dom";
import {
  Text,
  Paper,
  TextInput,
  NumberInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUpdateMenu } from "../api/updateMenu";
import { MenuType } from "../types";

export const MenuUpdatePage = () => {
  const location = useLocation();
  const menu = location.state?.menu as MenuType;
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      ...menu,
    },
    validate: {
      nama_menu: (value) =>
        value.length < 3 ? "Nama menu minimal 3 karakter" : null,
      harga: (value) =>
        value <= 0 ? "Harga harus lebih dari 0" : null,
    },
  });

  const mutationUpdateMenu = useUpdateMenu();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const menuData = {
      id_menu: form.values.id_menu,
      nama_menu: form.values.nama_menu,
      harga: form.values.harga,
    };

    await mutationUpdateMenu.mutateAsync(menuData, {
      onSuccess: (data) => {
        console.log("Success:", data);
        navigate("/data_master/menu");
      },
    });
  };

  if (!menu) return <Text>Memuat data menu...</Text>;

  return (
    <Paper
      shadow="md"
      radius="md"
      p="lg"
      withBorder
      className="max-w-md mx-auto mt-10 bg-white"
    >
      <Text fw={700} size="xl" mb="md">
        Edit Menu
      </Text>

      <form onSubmit={handleFormSubmit}>
        <TextInput
          label="Nama Menu"
          {...form.getInputProps("nama_menu")}
          required
        />
        <NumberInput
          label="Harga"
          min={1}
          {...form.getInputProps("harga")}
          required
        />
        <Button type="submit" color="green" mt="md">
          Simpan
        </Button>
        <Button
          onClick={() => navigate(-1)}
          color="red"
          mt="md"
        >
          Kembali
        </Button>
      </form>
    </Paper>
  );
};
