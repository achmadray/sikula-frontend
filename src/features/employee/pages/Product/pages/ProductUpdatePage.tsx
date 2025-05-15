import { useNavigate, useLocation } from "react-router-dom";
import { Text, Paper, TextInput, Select, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ProductType } from "../types";
import { useUpdateProduct } from "../api/updateProduct";
import { useEffect, useState } from "react";
import { UnitType, useGetAllUnit } from "../../Unit";

export const ProductUpdatePage = () => {
  const [units,setUnit] = useState<UnitType[]>([]);
  const {data:DataUnit} = useGetAllUnit();
  useEffect(()=>{
    if(DataUnit){
      setUnit(DataUnit)
    }
  },[DataUnit])
  const location = useLocation();
  const product = location.state.product as ProductType;
  console.log("data barang: ", product)
  const navigate = useNavigate();

  const selectUnit = units.map((unit) =>({
    value: unit.id_satuan.toString(),
    label: unit.nama_satuan,
  }));

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      nama_barang: product?.nama_barang || "",
      kode_barang: product?.kode_barang || "",
      id_satuan: product?.id_satuan.toString() || "",
      stok: product?.stok || ""
    },

    validate: {
      nama_barang: (value) =>
        value.length < 3 ? "Nama barang harus lebih dari 3 karakter" : null,
      kode_barang: (value) =>
        value.length < 3 ? "Kode barang harus lebih dari 3 karakter" : null,
      stok: (value) => (value.length === 0 ? "Stok tidak boleh kosong" : null),
    },
  });
  const mutationUpdateProduct = useUpdateProduct();
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ProductData = {
      id_barang: product.id_barang,
      id_satuan: form.values.id_satuan,
      id_pengguna: product.id_pengguna,
      nama_barang: form.values.nama_barang,
      kode_barang: form.values.kode_barang,
      stok: form.values.stok,
    };
    await mutationUpdateProduct.mutateAsync(ProductData, {
      onSuccess: (data) => {
        console.log("Succes:", data);
        navigate("/data_master/barang", {});
        close();
      },
    });
  };
  if (!product) return <Text>Memuat data barang...</Text>;

  return (
    <Paper
      shadow="md"
      radius="md"
      p="lg"
      withBorder
      className="max-w-md mx-auto mt-10 bg-white"
    >
      <Text fw={700} size="xl" mb="md">
        Edit Barang
      </Text>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          label="Nama Barang"
          {...form.getInputProps("nama_barang")}
          required
        />
        <TextInput
          label="Kode Barang"
          {...form.getInputProps("kode_barang")}
          required
        />
        <Select
          label="Unit"
          data={selectUnit}
          {...form.getInputProps("id_satuan")}
        />
        <TextInput label="Stok" {...form.getInputProps("stok")} required />
        <Button type="submit" color="green" mt="md">
          Simpan
        </Button>
      </form>
    </Paper>
  );
};
