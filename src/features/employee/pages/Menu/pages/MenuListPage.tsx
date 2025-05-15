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
import { useGetAllMenu } from "../api";
import Swal from "sweetalert2";
import { useDeleteMenu } from "../api/deleteMenu";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { MenuType } from "../types";

export const MenuListPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [menus, setMenus] = useState<MenuType[]>([]);
  const { data: DataMenus, isLoading: LoadingMenu } = useGetAllMenu();

  useEffect(() => {
    if (DataMenus) {
      setMenus(DataMenus);
    }
  }, [DataMenus]);

  const [menuToDelete, setMenuToDelete] = useState<MenuType | undefined>();
  const openDeleteModal = (menu: MenuType) => {
    setMenuToDelete(menu);
    open();
  };

  const deleteMenuMutation = useDeleteMenu();
  const deleteMenu = async () => {
    deleteMenuMutation.mutateAsync(menuToDelete?.id_menu, {
      onSuccess: () => {
        setMenus((prevMenus) =>
          prevMenus.filter((menu) => menu.id_menu !== menuToDelete?.id_menu)
        );
        close();
        Swal.fire({
          width: "80%",
          title: "Menu berhasil dihapus!",
          timer: 3000,
          icon: "success",
          confirmButtonText: "Ok",
        });
      },
      onError: (error) => {
        console.error("Error deleting menu:", error);
        Swal.fire({
          title: "Gagal Menghapus Menu",
          text: "Terjadi kesalahan saat menghapus menu. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      },
    });
  };

  return (
    <Container size="lg" mt="xl">
      <Paper p="lg" shadow="sm" radius="md">
        <Group justify="apart" mb="md">
          <Title order={2}>Daftar Menu</Title>
          <Button
            color="green"
            onClick={() => navigate("/data_master/menu/tambah")}
          >
            Tambah Menu
          </Button>
        </Group>

        {LoadingMenu ? (
          <Group justify="center" style={{ marginTop: "20px" }}>
            <Loader size="xl" variant="dots" />
          </Group>
        ) : (
          menus.map((menu) => (
            <div
              key={menu.id_menu}
              className="flex justify-between mb-4 p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <Text size="lg" fw={600}>
                    {menu.nama_menu}
                  </Text>
                </div>
                <Badge
                  size="sm"
                  color="blue"
                  radius="sm"
                  style={{ marginTop: "5px" }}
                >
                  {menu.harga} IDR
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="subtle"
                  color="gray"
                  onClick={() =>
                    navigate(`/data_master/menu/detail`, {
                      state: { menu },
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
                    navigate(`/data_master/menu/edit/${menu.id_menu}`, {
                      state: { menu },
                    })
                  }
                  size="xs"
                >
                  <IconPencil />
                </Button>
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => openDeleteModal(menu)}
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
        title={<span className="font-bold">Konfirmasi Hapus Menu?</span>}
      >
        <div>
          <span>Apakah Anda yakin ingin menghapus menu </span>
          <span className="font-semibold text-blue-600">
            {" "}
            {menuToDelete?.nama_menu}
          </span>
        </div>
        <div className="pt-10 flex gap-2 justify-end">
          {deleteMenuMutation.isPending ? (
            <Button color="red" disabled>
              Loading...
            </Button>
          ) : (
            <Button onClick={deleteMenu}>Yakin</Button>
          )}
          <Button color="red" onClick={close}>
            Batal
          </Button>
        </div>
      </Modal>
    </Container>
  );
};
