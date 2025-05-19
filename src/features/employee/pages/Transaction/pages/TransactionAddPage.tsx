import { useState } from "react";
import {
  Container,
  Paper,
  Title,
  TextInput,
  Select,
  NumberInput,
  Button,
  Group,
  Text,
} from "@mantine/core";
import { useAddTransaction } from "../api/addTransaction";
import { useNavigate } from "react-router-dom";

export const TransactionAddPage = () => {
  const navigate = useNavigate();

  const [idPengguna, setIdPengguna] = useState<number | null>(null);
  const [namaOrder, setNamaOrder] = useState("");
  const [metodePembayaran, setMetodePembayaran] = useState("");
  const [totalTransaksi, setTotalTransaksi] = useState<number | null>(null);

  const addTransactionMutation = useAddTransaction();

  const metodeOptions = [
    { value: "gopay", label: "Gopay" },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "shopeepay", label: "ShopeePay" },
    { value: "indomaret", label: "Indomaret" },
    { value: "qris", label: "QRIS" },
  ];

  const handleSubmit = async () => {
    if (!idPengguna || !namaOrder || !metodePembayaran || !totalTransaksi) {
      alert("Semua field wajib diisi.");
      return;
    }

    try {
      await addTransactionMutation.mutateAsync({
        id_pengguna: idPengguna,
        nama_order: namaOrder,
        metode_pembayaran: metodePembayaran,
        total_transaksi: totalTransaksi,
      });
      alert("Transaksi berhasil ditambahkan");
      navigate("/kasir");
    } catch (error) {
      alert("Gagal menambahkan transaksi");
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Paper p="lg" shadow="sm" radius="md">
        <Title order={3} mb="md">
          Tambah Transaksi Baru
        </Title>

        <TextInput
          label="ID Pengguna"
          placeholder="Masukkan ID pengguna"
          value={idPengguna ?? ""}
          onChange={(e) => setIdPengguna(Number(e.currentTarget.value))}
          type="number"
          required
          mb="sm"
        />

        <TextInput
          label="Nama Order"
          placeholder="Nama order"
          value={namaOrder}
          onChange={(e) => setNamaOrder(e.currentTarget.value)}
          required
          mb="sm"
        />

        <Select
          label="Metode Pembayaran"
          placeholder="Pilih metode pembayaran"
          data={metodeOptions}
          value={metodePembayaran}
          onChange={(value) => setMetodePembayaran(value || "")}
          required
          mb="sm"
        />

        <NumberInput
          label="Total Transaksi"
          placeholder="Masukkan total transaksi"
          value={totalTransaksi}
          onChange={(value) => setTotalTransaksi(value)}
          min={0}
          required
          mb="sm"
          parser={(value) => value?.replace(/\$\s?|(,*)/g, "") || ""}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value || ""))
              ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : "$ "
          }
        />

        <Group justify="right" mt="xl">
          <Button
            onClick={handleSubmit}
            loading={addTransactionMutation.isLoading}
            disabled={addTransactionMutation.isLoading}
          >
            Simpan
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Batal
          </Button>
        </Group>

        {addTransactionMutation.isError && (
          <Text color="red" size="sm" mt="sm">
            Gagal menambahkan transaksi.
          </Text>
        )}
      </Paper>
    </Container>
  );
};
