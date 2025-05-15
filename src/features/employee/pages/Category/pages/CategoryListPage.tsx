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
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useGetAllCategory } from "../api/getCategory";
import { CategoryType } from "../types";
import Swal from "sweetalert2";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useDeleteCategory } from "../api/deleteCategory";

export const CategoryListPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const { data: DataCategories, isLoading: LoadingCategory } =
    useGetAllCategory();

  useEffect(() => {
    if (DataCategories) {
      setCategories(DataCategories);
    }
  }, [DataCategories]);

  const [categoryToDelete, setCategoryToDelete] = useState<CategoryType>();
  const openDeleteModal = (category: CategoryType) => {
    setCategoryToDelete(category);
    open();
  };

  const deleteCategoryMutation = useDeleteCategory();
  const deleteCategory = async () => {
    deleteCategoryMutation.mutateAsync(categoryToDelete?.id_kategori, {
      onSuccess: () => {
        setCategories(
          categories.filter(
            (category) => category.id_kategori !== categoryToDelete?.id_kategori
          )
        );
        close();
        Swal.fire({
          width: "80%",
          title: "Kategori berhasil dihapus!",
          timer: 3000,
          icon: "success",
          confirmButtonText: "Ok",
        });
      },
    });
  };

  return (
    <Container size="lg" mt="xl">
      <Paper padding="lg" shadow="sm" radius="md">
        <Group justify="apart" mb="md">
          <Title order={2}>Daftar Kategori</Title>
          <Button
            color="green"
            onClick={() => navigate("/data_master/kategori/tambah")}
          >
            Tambah Kategori
          </Button>
        </Group>

        {LoadingCategory ? (
          <Group justify="center" style={{ marginTop: "20px" }}>
            <Loader size="xl" variant="dots" />
          </Group>
        ) : (
          categories.map((category) => (
            <div
              key={category.id_kategori}
              className="flex justify-between mb-4 p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-center space-x-4">
                <Text size="lg" weight={600}>
                  {category.nama_kategori}
                </Text>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="subtle"
                  color="gray"
                  onClick={() =>
                    navigate(`/data_master/kategori/detail`, {
                      state: { category },
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
                    navigate(
                      `/data_master/kategori/edit/${category.id_kategori}`,
                      {
                        state: { category },
                      }
                    )
                  }
                  size="xs"
                >
                  <IconPencil />
                </Button>
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => openDeleteModal(category)}
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
        title={<span className="font-bold">Konfirmasi Hapus?</span>}
      >
        <div>
          <span>Apakah anda yakin ingin menghapus kategori </span>
          <span className="font-semibold text-blue-600">
            {categoryToDelete?.nama_kategori}
          </span>
          ?
        </div>
        <div className="pt-10 flex gap-2 justify-end">
          {deleteCategoryMutation.isPending ? (
            <Button color="red" disabled>
              Loading...
            </Button>
          ) : (
            <Button onClick={deleteCategory}>Yakin</Button>
          )}
          <Button color="red" onClick={close}>
            Batal
          </Button>
        </div>
      </Modal>
    </Container>
  );
};
