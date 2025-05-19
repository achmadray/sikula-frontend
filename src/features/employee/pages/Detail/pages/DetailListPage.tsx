import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Title,
  Group,
  Button,
  Loader,
  Text,
  Modal,
} from "@mantine/core";
import Swal from "sweetalert2";
import { IconTrash, IconEye, IconPencil } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useGetAllDetail } from "../api/getDetail";
import { useDeleteDetail } from "../api/deleteDetail";
import { DetailType } from "../types";

export const DetailListPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [details, setDetails] = useState<DetailType[]>([]);
  const [detailToDelete, setDetailToDelete] = useState<DetailType | null>(null);

  const { data: fetchedDetails, isLoading } = useGetAllDetail();
  const deleteMutation = useDeleteDetail();

  useEffect(() => {
    if (fetchedDetails) {
      setDetails(fetchedDetails);
    }
  }, [fetchedDetails]);

  const openDeleteModal = (detail: DetailType) => {
    setDetailToDelete(detail);
    open();
  };

  const deleteDetail = async () => {
    if (detailToDelete?.id_detail_transaksi) {
      deleteMutation.mutate(detailToDelete.id_detail_transaksi, {
        onSuccess: () => {
          const newDetails = details.filter(
            (item) =>
              item.id_detail_transaksi !== detailToDelete.id_detail_transaksi
          );
          setDetails(newDetails);
          close();
          Swal.fire({
            icon: "success",
            title: "Detail transaksi berhasil dihapus!",
            timer: 2000,
            showConfirmButton: false,
          });
        },
      });
    }
  };

  return (
    <Container size="lg" mt="xl">
      <Paper p="lg" shadow="sm" radius="md">
        <Group justify="apart" mb="md">
          <Title order={2}>Daftar Detail Transaksi</Title>
          <Button color="green" onClick={() => navigate("/detail/tambah")}>
            Tambah Detail
          </Button>
        </Group>

        {isLoading ? (
          <Group justify="center">
            <Loader size="xl" variant="dots" />
          </Group>
        ) : (
          details.map((detail) => (
            <div
              key={detail.id_detail_transaksi}
              className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded shadow"
            >
              <div>
                <Text fw={500}>Menu: {detail.menu?.nama_menu}</Text>
              </div>

              <Group justify="right" mt="md">
                <Button
                  variant="subtle"
                  color="gray"
                  onClick={() =>
                    navigate(`/detail_transaksi/detail`, {
                      state: { detail },
                    })
                  }
                  size="xs"
                  title="Lihat Detail"
                >
                  <IconEye />
                </Button>
                <Button
                  variant="light"
                  color="blue"
                  onClick={() =>
                    navigate(`/detail/edit/${detail.id_detail_transaksi}`, {
                      state: { detail },
                    })
                  }
                  size="xs"
                >
                  <IconPencil />
                </Button>
                <Button
                  color="red"
                  variant="outline"
                  size="xs"
                  onClick={() => openDeleteModal(detail)}
                  title="Hapus Detail"
                >
                  <IconTrash />
                </Button>
              </Group>
            </div>
          ))
        )}
      </Paper>

      <Modal opened={opened} onClose={close} title="Konfirmasi Hapus" centered>
        <Text>Yakin ingin menghapus detail transaksi ini?</Text>
        <Group justify="right" mt="md">
          <Button color="red" onClick={deleteDetail}>
            Hapus
          </Button>
          <Button variant="default" onClick={close}>
            Batal
          </Button>
        </Group>
      </Modal>
    </Container>
  );
};
