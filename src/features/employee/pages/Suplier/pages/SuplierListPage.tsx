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
import Swal from "sweetalert2";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { SuplierType } from "../types";
import { useDeleteSuplier, useGetAllSuplier } from "../api";

export const SuplierListPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [supliers, setSupliers] = useState<SuplierType[]>([]);
  const {
    data: DataSupliers,
    isLoading: LoadingSuplier,
    refetch: RefetchSuplier,
  } = useGetAllSuplier();

  useEffect(() => {
    if (DataSupliers) {
      setSupliers(DataSupliers);
    }
  }, [DataSupliers]);
  console.log("Data suplier :", supliers);

  const [suplierToDelete, setSuplierToDelete] = useState<SuplierType>();
  const openDeleteModal = (suplier: SuplierType) => {
    setSuplierToDelete(suplier);
    open();
  };

  const deleteSuplierMutation = useDeleteSuplier();

  const deleteSuplier = async () => {
    deleteSuplierMutation.mutateAsync(suplierToDelete?.id_suplier, {
      onSuccess: (data) => {
        console.log("Success Delete:", data);

        RefetchSuplier();
        close();
        Swal.fire({
          width: "80%",
          title: "Data suplier berhasil dihapus!",
          timer: 3000,
          icon: "success",
          confirmButtonText: "Ok",
        });
      },
    });
  };

  return (
    <Container size="lg" mt="xl">
      <Paper p="lg" shadow="sm" radius="md">
        <Group justify="apart" mb="md">
          <Title order={2}>Daftar Suplier</Title>
          <Button color="green" onClick={() => navigate("/data_master/suplier/tambah")}>
            Tambah Suplier
          </Button>
        </Group>

        {LoadingSuplier ? (
          <Group justify="center" style={{ marginTop: "20px" }}>
            <Loader size="xl" variant="dots" />
          </Group>
        ) : (
          supliers.map((suplier) => (
            <div
              key={suplier.id_suplier}
              className="flex justify-between mb-4 p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <Text size="lg" fw={600}>
                    {suplier.nama_suplier}
                  </Text>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="subtle"
                  color="gray"
                  onClick={() =>
                    navigate(`/data_master/suplier/detail`,{state:{suplier}})
                  }
                  size="xs"
                >
                  <IconEye />
                </Button>
                <Button
                  variant="light"
                  color="blue"
                  onClick={() =>
                    navigate(`/data_master/suplier/edit/${suplier.id_suplier}`, {
                      state: { suplier },
                    })
                  }
                  size="xs"
                >
                  <IconPencil />
                </Button>
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => openDeleteModal(suplier)}
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
          <span>Apakah anda yakin ingin menghapus data pendidikan</span>
          <span className="font-semibold text-blue-600">
            {" "}
            {suplierToDelete?.nama_suplier}
          </span>
        </div>
        <div className="pt-10 flex gap-2 justify-end">
          {deleteSuplierMutation.isPending ? (
            <Button color="red" disabled>
              Loading...
            </Button>
          ) : (
            <Button onClick={deleteSuplier}>Yakin</Button>
          )}
          <Button color="red" onClick={close}>
            Batal
          </Button>
        </div>
      </Modal>
    </Container>
  );
};
