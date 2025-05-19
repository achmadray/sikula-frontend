import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Group,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { DetailType } from "../types";

export const DetailDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const detail = location.state?.detail as DetailType;

  if (!detail) {
    return (
      <Container size="lg" mt="xl">
        <Paper p="lg" shadow="sm" radius="md">
          <Title order={3}>Detail tidak ditemukan</Title>
          <Button mt="md" onClick={() => navigate(-1)} leftSection={<IconArrowLeft />}>
            Kembali
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="lg" mt="xl">
      <Paper p="lg" shadow="sm" radius="md">
        <Group justify="space-between" mb="md">
          <Title order={2}>Detail Transaksi</Title>
          <Button variant="light" onClick={() => navigate(-1)} leftSection={<IconArrowLeft />}>
            Kembali
          </Button>
        </Group>

        <Text fw={500} mb="xs">Menu: {detail.menu?.nama_menu ?? "Tidak tersedia"}</Text>
        <Text mb="xs">Jumlah: {detail.jumlah}</Text>
        <Text mb="xs">Total Harga: Rp {detail.total_harga.toLocaleString()}</Text>
        <Text mb="xs">
          Tanggal Transaksi:{" "}
          {detail.transaksi?.tanggal_transaksi
            ? new Date(detail.transaksi.tanggal_transaksi).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Tidak tersedia"}
        </Text>
        <Text mb="xs">
          Transaksi: {detail.transaksi?.id_transaksi ?? "Tidak tersedia"}
        </Text>
      </Paper>
    </Container>
  );
};
