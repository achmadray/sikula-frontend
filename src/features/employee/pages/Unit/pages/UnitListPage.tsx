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
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Swal from "sweetalert2";
import { UnitType, useGetAllUnit } from "../api";
import { useDeleteUnit } from "../api/deleteUnit";

export const UnitListPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [units, setUnits] = useState<UnitType[]>([]);
  const { data: DataUnits, isLoading: loading } = useGetAllUnit();

  useEffect(() => {
    if (DataUnits) {
      setUnits(DataUnits);
    }
  }, [DataUnits]);

  const handleDelete = async (unitId: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus satuan ini?")) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/satuan/${unitId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          setUnits(units.filter((unit) => unit.id_satuan !== unitId));
        } else {
          console.error("Gagal menghapus sataun.");
        }
      } catch (error) {
        console.error("Error menghapus satuan:", error);
      }
    }
  };

  const [unitToDelete, setUnitToDelete] = useState<UnitType | null>(null);
  const openDeleteModal = (unit: UnitType) => {
    setUnitToDelete(unit);
    open();
  };

  const deleteUnitMutation = useDeleteUnit();
  const deleteUnit = async () => {
    if (unitToDelete?.id_satuan) {
      deleteUnitMutation.mutateAsync(unitToDelete.id_satuan, {
        onSuccess: (data) => {
          const newUnits = units.filter(
            (unit) => unit.id_satuan !== unitToDelete.id_satuan
          );
          setUnits(newUnits);
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
      <Paper p="lg" shadow="sm" radius="md">
        <Group justify="apart" mb="md">
          <Title order={2}>Daftar Satuan</Title>
          <Button
            color="green"
            onClick={() => navigate("/data_master/satuan/tambah")}
          >
            Tambah Satuan
          </Button>
        </Group>

        {loading ? (
          <Group justify="center" style={{ marginTop: "20px" }}>
            <Loader size="xl" variant="dots" />
          </Group>
        ) : (
          units.map((unit) => (
            <div
              key={unit.id_satuan}
              className="flex justify-between mb-4 p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <Text size="lg" weight={600}>
                {unit.nama_satuan}
              </Text>
              <div className="flex items-center space-x-2">
                <Button
                  variant="subtle"
                  color="gray"
                  onClick={() =>
                    navigate(`/data_master/unit/detail`, { state: { unit } })
                  }
                  size="xs"
                >
                  <IconEye />
                </Button>
                <Button
                  variant="light"
                  color="blue"
                  onClick={() =>
                    navigate(`/data_master/satuan/edit/${unit.id_satuan}`, {
                      state: { unit },
                    })
                  }
                  size="xs"
                >
                  <IconPencil />
                </Button>
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => openDeleteModal(unit)}
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
          <span>Apakah Anda yakin ingin menghapus satuan</span>
          <span className="font-semibold text-blue-600">
            {" "}
            {unitToDelete?.nama_satuan}
          </span>
          ?
        </div>
        <div className="pt-10 flex gap-2 justify-end">
          <Button color="red" onClick={deleteUnit}>
            Yakin
          </Button>
          <Button onClick={close}>Batal</Button>
        </div>
      </Modal>
    </Container>
  );
};
