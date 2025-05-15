import { useNavigate } from "react-router-dom";
import { Text, Paper, TextInput, Select, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAddAccount } from "../api/addAccount";

export const AccountAddPage = () => {
  const navigate = useNavigate();

  const form = useForm({
      validateInputOnChange: true,
      initialValues: {
        username: '',
        level: '',
        password: '',
      },
      validate: {
        username: (value) =>
          value.length < 5 ? "Username must have at least 5 letters" : null,
        level: (value) =>
          value.length < 5 ? "Level must have at least 5 letters" : null,
        password: (value) =>
          value.length < 10 ? "Password must have at least 10 letters" : null,
      },
    });
const mutationAddAccount = useAddAccount();
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const AccountData = {
      username: form.values.username,
      level: form.values.level,
      password: form.values.password,
    };

    console.log(AccountData);
    await mutationAddAccount.mutateAsync(AccountData, {
      onSuccess: (data) => {
        console.log("Succes:", data);
        navigate("/akun", {});
        close();
      },
    });
  };
  return (
    <Paper shadow="md" radius="md" p="lg" withBorder className="max-w-md mx-auto mt-10 bg-white">
      <Text fw={700} size="xl" mb="md">Tambah Akun</Text>
      <form onSubmit={handleFormSubmit}>
              <TextInput
                label="Username"
                {...form.getInputProps("username")}
                required
              />
              <Select
                label="Level"
                {...form.getInputProps("level")}
                data={[
                  { value: "admin", label: "Admin" },
                  { value: "pegawai", label: "Pegawai" },
                  { value: "kasir", label: "Kasir" },
                  { value: "pengelola_gudang", label: "Pengelola Gudang" },
                ]}
                required
              />
              <PasswordInput
                label="Password"
                {...form.getInputProps("password")}
              />
              <Button type="submit" color="green" mt="md">
                Simpan
              </Button>
            </form>
    </Paper>
  );
};
