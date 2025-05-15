/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  Button,
  Text,
  Container,
  Paper,
  Title,
  Group,
  Loader,
  Modal,
  UnstyledButton,
  TextInput,
  Select,
  NumberInput,
} from "@mantine/core";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useGetAllProduct } from "../../Product/api";
import { ProductType } from "../../Product/types";
import { IconCaretLeft, IconCaretRight } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { ProductInType } from "../types";
import { useAddIncomingProduct } from "../api/addProductIn";
import { SuplierType, useGetAllSuplier } from "../../Suplier";

export const ProductInListPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  //   GET SUPPLIER
  const [suppliers, setSuppliers] = useState<SuplierType[]>([]);
  const { data: DataSupplier } = useGetAllSuplier();
  useEffect(() => {
    if (DataSupplier) {
      setSuppliers(DataSupplier);
    }
  }, [DataSupplier]);
  // END GET SUPPLIER
  const [products, setProducts] = useState<ProductType[]>([]);
  const { data: DataProducts, isLoading: LoadingProduct } = useGetAllProduct();

  useEffect(() => {
    if (DataProducts) {
      setProducts(DataProducts);
    }
  }, [DataProducts]);

  const [selectedProduct, setSelectedProduct] = useState<ProductType>();
  //   console.log("BArang yang tambuk :", selectedProduct);
  //   Stok
  const [incomingStok, setIncomingStok] = useState<number>(0);
  useEffect(() => {
    setIncomingStok(0);
  }, [opened]);
  const handleIncrease = () => {
    setIncomingStok((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setIncomingStok((prev) => (prev > 0 ? prev - 1 : 0));
  };
  //   End stok

  const form = useForm({
    initialValues: {
      harga: 0,
      id_supplier: "",
      tanggal_masuk: "",
    },
    validate: {
      harga: (value) =>
        value < 3 ? "Nama barang harus lebih dari 3 karakter" : null,
    },
  });

  const mutationAddProduct = useAddIncomingProduct();
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (incomingStok <= 0) {
      alert("Stok masuk harus lebih dari 0");
      return;
    }
    const incomingProductData = {
      id_barang: selectedProduct?.id_barang,
      id_suplier: parseInt(form.values.id_supplier),
      harga: form.values.harga,
      jumlah: incomingStok,
      stok_masuk: incomingStok,
      total_harga: incomingStok * form.values.harga,
      tanggal_masuk: format(new Date(form.values.tanggal_masuk), "yyyy-MM-dd"),
    };

    console.log("Data yang dikirim :", incomingProductData);

    await mutationAddProduct.mutateAsync(incomingProductData, {
      onSuccess: (data: ProductInType) => {
        console.log("Success:", data);
        navigate("/barang_masuk");
      },
    });
  };

  return (
    <Container size="lg" mt="xl">
      <Paper p="lg" shadow="sm" radius="md">
        <Group justify="apart" mb="md">
          <Title order={2}>Daftar Barang Masuk</Title>
          <Button
            color="green"
            onClick={() => navigate("/data_master/barang/tambah")}
          >
            Tambah Produk
          </Button>
        </Group>

        {LoadingProduct ? (
          <Group justify="center" style={{ marginTop: "20px" }}>
            <Loader size="xl" variant="dots" />
          </Group>
        ) : (
          <div className="grid grid-cols-12 gap-4">
            {products.map((product) => {
              return (
                <div
                  key={product.id_barang}
                  className="col-span-4 mb-4 p-4 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <UnstyledButton
                    onClick={() => {
                      open();
                      setSelectedProduct(product);
                    }}
                  >
                    <div className="flex flex-col">
                      <Text size="lg" fw={600}>
                        {product.nama_barang}
                      </Text>
                      <Text size="lg" fw={600}>
                        Stok: {product.stok}
                      </Text>
                    </div>
                  </UnstyledButton>
                </div>
              );
            })}
          </div>
        )}
      </Paper>
      <Modal opened={opened} title="Barang masuk" onClose={close}>
        <div className="flex justify-center mb-20">
          <form onSubmit={handleFormSubmit}>
            <div className="text-center">
              <Text fw={"bolder"} size="xl">
                {selectedProduct?.nama_barang}
              </Text>
            </div>
            <div className="flex justify-between gap-4">
              <div className="shadow-md">
                <UnstyledButton size="xl" onClick={handleDecrease}>
                  <IconCaretLeft size={40} />
                </UnstyledButton>
              </div>
              <div>
                <Text size="50px" fw={"bold"}>
                  {incomingStok}
                </Text>
              </div>
              <div className="shadow-md">
                <UnstyledButton size="xl" onClick={handleIncrease}>
                  <IconCaretRight size={40} />
                </UnstyledButton>
              </div>
            </div>
            <div>
              <NumberInput
                label="Harga"
                {...form.getInputProps("harga")}
                key={form.key("harga")}
              />
            </div>
            <div>
              <DatePickerInput
                label="Tanggal masuk"
                {...form.getInputProps("tanggal_masuk")}
                key={form.key("tanggal_masuk")}
              />
            </div>
            <div>
              <Select
                label="Supplier"
                {...form.getInputProps("id_supplier")}
                data={suppliers?.map((data: SuplierType) => ({
                  value: data.id_suplier.toString(),
                  label: data.nama_suplier,
                }))}
              />
            </div>
            <div className="mt-7">
              <Button fullWidth type="submit">
                Simpan
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </Container>
  );
};
