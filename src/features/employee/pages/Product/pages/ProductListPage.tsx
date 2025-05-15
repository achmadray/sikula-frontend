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
import { useGetAllProduct } from "../api/getProduct";
import { ProductType } from "../types";
import Swal from "sweetalert2";
import { useDeleteProduct } from "../api/deleteProduct";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";

export const ProductListPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductType[]>([]);
  const { data: DataProducts, isLoading: LoadingProduct } = useGetAllProduct();

  useEffect(() => {
    if (DataProducts) {
      setProducts(DataProducts);
    }
  }, [DataProducts]);

  const handleDelete = async (productId: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/barang/${productId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          setProducts(
            products.filter((product) => product.id_barang !== productId)
          );
        } else {
          console.error("Gagal menghapus produk.");
        }
      } catch (error) {
        console.error("Error menghapus produk:", error);
      }
    }
  };

  const [productToDelete, setProductToDelete] = useState<ProductType | null>(
    null
  );
  const openDeleteModal = (product: ProductType) => {
    setProductToDelete(product);
    open();
  };

  const deleteProductMutation = useDeleteProduct();
  const deleteProduct = async () => {
    if (productToDelete?.id_barang) {
      deleteProductMutation.mutateAsync(productToDelete.id_barang, {
        onSuccess: (data) => {
          const newProducts = products.filter(
            (product) => product.id_barang !== productToDelete.id_barang
          );
          setProducts(newProducts);
          close();
          Swal.fire({
            width: "80%",
            title: "Produk berhasil dihapus!",
            timer: 3000,
            icon: "success",
            confirmButtonText: "Ok",
          });
        },
      });
    }
  };

  return (
    <Container size="lg" mt="xl">
      <Paper padding="lg" shadow="sm" radius="md">
        <Group justify="apart" mb="md">
          <Title order={2}>Daftar Produk</Title>
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
                  <Text size="lg" weight={600}>
                    {" "}
                    {product.nama_barang}
                  </Text>
                </div>
                <Badge
                  size="sm"
                  color="blue"
                  radius="sm"
                  style={{ marginTop: "5px" }}
                >
                  {product.kode_barang}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="subtle"
                  color="gray"
                  onClick={() =>
                    navigate(`/data_master/barang/detail`, {
                      state: { product },
                    })
                  }
                  size="xs"
                >
                  <IconEye />
                </Button>
                <Button
                  variant="light"
                  color="blue"
                  onClick={() =>
                    navigate(`/data_master/barang/edit/${product.id_barang}`, {
                      state: { product },
                    })
                  }
                  size="xs"
                >
                  <IconPencil />
                </Button>
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => openDeleteModal(product)}
                  size="xs"
                >
                  <IconTrash />
                </Button>
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
      >
        <div>
          <span>Apakah anda yakin ingin menghapus produk</span>
          <span className="font-semibold text-blue-600">
            {" "}
            {productToDelete?.nama_barang}
          </span>
        </div>
        <div className="pt-10 flex gap-2 justify-end">
          {deleteProductMutation.isPending ? (
            <Button color="red" disabled>
              Loading...
            </Button>
          ) : (
            <Button onClick={deleteProduct}>Yakin</Button>
          )}
          <Button color="red" onClick={close}>
            Batal
          </Button>
        </div>
      </Modal>
    </Container>
  );
};
