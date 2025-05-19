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
import { IconEye, IconTrash, IconCash } from "@tabler/icons-react";
import Swal from "sweetalert2";
import { useDisclosure } from "@mantine/hooks";
import { TransaksiType } from "../types";
import { useGetAllTransaction } from "../api/getTransaction";
import { useDeleteTransaction } from "../api/deleteTransaction";

declare global {
  interface Window {
    snap: any;
  }
}

export const TransactionListPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<TransaksiType[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransaksiType | null>(null);

  const { data: DataTransaction, isLoading: LoadingTransaction } =
    useGetAllTransaction();
  const deleteTransactionMutation = useDeleteTransaction();

  useEffect(() => {
    if (DataTransaction) {
      setTransactions(DataTransaction);
    }
  }, [DataTransaction]);

  const openDeleteModal = (trx: TransaksiType) => {
    setSelectedTransaction(trx);
    open();
  };

  const deleteTransaction = async () => {
    if (selectedTransaction?.id_transaksi) {
      deleteTransactionMutation.mutateAsync(selectedTransaction.id_transaksi, {
        onSuccess: () => {
          const newData = transactions.filter(
            (trx) => trx.id_transaksi !== selectedTransaction.id_transaksi
          );
          setTransactions(newData);
          close();
          Swal.fire({
            width: "80%",
            title: "Transaksi berhasil dihapus!",
            timer: 3000,
            icon: "success",
            confirmButtonText: "Ok",
          });
        },
      });
    }
  };

  const handlePayment = async (trx: TransaksiType) => {
    try {
      const response = await fetch(
        `/api/transaksi/${trx.id_transaksi}/payment-token`
      );
      const data = await response.json();

      if (data.snap_token) {
        window.snap.pay(data.snap_token, {
          onSuccess: () => {
            Swal.fire("Pembayaran berhasil!", "", "success");
            setTransactions((prev) =>
              prev.map((t) =>
                t.id_transaksi === trx.id_transaksi
                  ? { ...t, status_pembayaran: "lunas" }
                  : t
              )
            );
          },
          onPending: () => {
            Swal.fire("Pembayaran menunggu konfirmasi", "", "info");
          },
          onError: () => {
            Swal.fire("Pembayaran gagal!", "", "error");
          },
          onClose: () => {
            Swal.fire("Pembayaran dibatalkan", "", "warning");
          },
        });
      } else {
        Swal.fire("Gagal mendapatkan snap token", "", "error");
      }
    } catch {
      Swal.fire("Error saat proses pembayaran", "", "error");
    }
  };

  return (
    <Container size="lg" mt="xl">
      <Paper p="lg" shadow="sm" radius="md">
        <Group justify="space-between" mb="md">
          <Title order={2} size="h4">
            Daftar Transaksi
          </Title>
          <Button
            color="green"
            size="sm"
            onClick={() => navigate("/kasir/tambah")}
          >
            Tambah Transaksi
          </Button>
        </Group>

        {LoadingTransaction ? (
          <Group justify="center" mt="20px">
            <Loader size="xl" variant="dots" />
          </Group>
        ) : (
          transactions.map((trx) => (
            <div
              key={trx.id_transaksi}
              className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-4 p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition-all"
            >
              <div>
                <Text size="md" fw={600} className="text-gray-800">
                  #{trx.no_urut} - {trx.nama_order}
                </Text>
                <Text size="sm" fw={600} color="black">
                  Status:{" "}
                  <Text
                    component="span"
                    fw={600}
                    color={
                      trx.status_pembayaran === "lunas"
                        ? "green"
                        : trx.status_pembayaran === "pending"
                        ? "yellow"
                        : "red"
                    }
                  >
                    {trx.status_pembayaran}
                  </Text>
                </Text>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="subtle"
                  color="gray"
                  onClick={() =>
                    navigate(`/kasir/kasir/detail`, {
                      state: { transaksi: trx },
                    })
                  }
                  size="xs"
                  px={10}
                >
                  <IconEye size={16} />
                </Button>

                {trx.status_pembayaran === "pending" && (
                  <Button
                    variant="light"
                    color="blue"
                    onClick={() => handlePayment(trx)}
                    size="xs"
                    px={10}
                  >
                    <IconCash size={16} />
                  </Button>
                )}

                <Button
                  variant="outline"
                  color="red"
                  onClick={() => openDeleteModal(trx)}
                  size="xs"
                  px={10}
                >
                  <IconTrash size={16} />
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
        title={<Text fw={600}>Konfirmasi Hapus Transaksi</Text>}
      >
        <Text mb="sm" size="sm">
          Yakin ingin menghapus transaksi{" "}
          <Text span fw={600} c="blue">
            #{selectedTransaction?.no_urut}
          </Text>
          ?
        </Text>

        <Group justify="end" mt="md">
          {deleteTransactionMutation.isPending ? (
            <Button color="red" disabled>
              Menghapus...
            </Button>
          ) : (
            <Button onClick={deleteTransaction}>Yakin</Button>
          )}
          <Button color="gray" variant="outline" onClick={close}>
            Batal
          </Button>
        </Group>
      </Modal>
    </Container>
  );
};
