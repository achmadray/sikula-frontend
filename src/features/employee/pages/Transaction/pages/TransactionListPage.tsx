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
import { IconEye, IconTrash } from "@tabler/icons-react";
import Swal from "sweetalert2";
import { useDisclosure } from "@mantine/hooks";
import { TransaksiType } from "../types";
import { useGetAllTransaction } from "../api/getTransaction";
import { useDeleteTransaction } from "../api/deleteTransaction";

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

  return (
    <Container size="lg" mt="xl">
      <Paper p="lg" shadow="sm" radius="md">
        <Group justify="apart" mb="md">
          <Title order={2}>Daftar Transaksi</Title>
          <Button
            color="green"
            onClick={() => navigate("/kasir/transaksi/tambah")}
          >
            Tambah Transaksi
          </Button>
        </Group>

        {LoadingTransaction ? (
          <Group justify="center" style={{ marginTop: "20px" }}>
            <Loader size="xl" variant="dots" />
          </Group>
        ) : (
          transactions.map((trx) => (
            <div
              key={trx.id_transaksi}
              className="flex justify-between mb-4 p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex flex-col">
                <Text size="lg" fw={600}>
                  #{trx.no_urut} - {trx.nama_order}
                </Text>
                <Text size="sm" color="dimmed">
                  {trx.tanggal_transaksi} | Total: Rp
                  {trx.total_transaksi.toLocaleString()}
                </Text>
                <Badge
                  color={trx.status_pembayaran === "lunas" ? "green" : "yellow"}
                  mt={4}
                >
                  {trx.status_pembayaran.toUpperCase()}
                </Badge>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="subtle"
                  color="gray"
                  onClick={() =>
                    navigate(`/kasir/transaksi/detail`, {
                      state: { transaksi: trx },
                    })
                  }
                  size="xs"
                >
                  <IconEye />
                </Button>
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => openDeleteModal(trx)}
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
        title={<span className="font-bold">Konfirmasi Hapus Transaksi</span>}
      >
        <div>
          <span>Yakin ingin menghapus transaksi</span>{" "}
          <span className="font-semibold text-blue-600">
            #{selectedTransaction?.no_urut}
          </span>
          ?
        </div>
        <div className="pt-10 flex gap-2 justify-end">
          {deleteTransactionMutation.isPending ? (
            <Button color="red" disabled>
              Menghapus...
            </Button>
          ) : (
            <Button onClick={deleteTransaction}>Yakin</Button>
          )}
          <Button color="red" onClick={close}>
            Batal
          </Button>
        </div>
      </Modal>
    </Container>
  );
};
