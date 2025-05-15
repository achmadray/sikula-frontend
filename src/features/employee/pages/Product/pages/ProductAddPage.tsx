import { Text, Paper, TextInput, Select, Button, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useAddProduct } from "../api/addProduct";
import { useGetAllUnit } from "../../Unit";
import { useGetPenggunaByAkunId } from "../../Profile";
import { UnitType } from "../../Unit/types";

export const ProductAddPage = () => {
  const navigate = useNavigate();
  const { data: units, isLoading: loadingUnits } = useGetAllUnit();
  const { data: pengguna, isLoading: loadingPengguna } = useGetPenggunaByAkunId(1);

  const form = useForm({
    initialValues: {
      nama_barang: "",
      id_satuan: "",
      id_pengguna: pengguna ? pengguna.id_pengguna : "",
      stok: "",
    },
    validate: {
      nama_barang: (value) => value.length < 3 ? "Nama barang harus lebih dari 3 karakter" : null,
      stok: (value) => value.length === 0 ? "Stok tidak boleh kosong" : null,
    },
  });

  const mutationAddProduct = useAddProduct();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const productData = {
      nama_barang: form.values.nama_barang,
      id_satuan: parseInt(form.values.id_satuan),
      id_pengguna: form.values.id_pengguna,
      stok: parseInt(form.values.stok),
    };

    await mutationAddProduct.mutateAsync(productData, {
      onSuccess: (data) => {
        console.log("Success:", data);
        navigate("/data_master/barang");
      },
    });
  };

  if (loadingUnits || loadingPengguna) {
    return <Loader />;
  }

  return (
    <Paper shadow="md" radius="md" p="lg" withBorder className="max-w-md mx-auto mt-10 bg-white">
      <Text fw={700} size="xl" mb="md">Tambah Barang</Text>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          label="Nama Barang"
          {...form.getInputProps("nama_barang")}
          required
        />
        <Select
          label="Unit"
          {...form.getInputProps("id_satuan")}
          data={units?.map((unit: UnitType) => ({
            value: unit.id_satuan.toString(),
            label: unit.nama_satuan,
          }))}
          required
        />
        <TextInput
          label="Stok"
          {...form.getInputProps("stok")}
          required
        />
        <Button type="submit" color="green" mt="md">
          Simpan
        </Button>
      </form>
    </Paper>
  );
};
