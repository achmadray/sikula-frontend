/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  Button,
  Text,
  Container,
  Paper,
  Title,
  Group,
  Badge,
  Loader,
  Modal,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { ProductInType } from "../types";
import { useGetAllProduct } from "../../Product/api";
import { ProductType } from "../../Product/types";

export const ProductInListPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductType[]>([]);
  const { data: DataProducts, isLoading: LoadingProduct } = useGetAllProduct();

  useEffect(() => {
    if (DataProducts) {
      setProducts(DataProducts);
    }
  }, [DataProducts]);

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
          products.map((product) => (
            <div
              key={product.id_barang}
              className="flex justify-between mb-4 p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <Text size="lg" fw={600}>
                    {" "}
                    {product.nama_barang}
                  </Text>
                  <Text size="lg" fw={600}>
                    {" "}
                    {product.stok}
                  </Text>
                </div>
              </div>
            </div>
          ))
        )}
      </Paper>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title={<span className="font-bold">Konfirmasi Hapus ?</span>}
      ></Modal>
    </Container>
  );
};
