import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Text,
  Container,
  Paper,
  Group,
  Badge,
  Title,
} from "@mantine/core";
import { ProductOutType } from "../types";

export const ProductOutDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const productout = location.state?.productout as ProductOutType | undefined;

  if (!productout) {
    return (
      <Container size="lg" mt="xl" style={{ textAlign: "center" }}>
        <Text color="red" size="lg" mb="md">
          Data barang keluar tidak tersedia.
        </Text>
        <Button onClick={() => navigate("/barang_keluar")}>
          Kembali ke Daftar
        </Button>
      </Container>
    );
  }

  return (
    <Container size="lg" mt="xl">
      <Group justify="space-between" mb="lg">
        <Title order={3}>Detail Barang Keluar</Title>
        <Button variant="outline" onClick={() => navigate("/barang_keluar")}>
          Kembali ke Daftar
        </Button>
      </Group>

      <Paper p="lg" shadow="sm" radius="md">
        <Paper withBorder radius="md" p="md" mb="md">
          <Group justify="apart" align="start">
            <div className="flex flex-col gap-2">
              <Text size="sm">
                <strong>Nama Barang:</strong>{" "}
                <Badge color="grape" variant="light">
                  {productout.barang?.nama_barang ?? "-"}
                </Badge>
              </Text>

              <Text size="sm">
                <strong>Pengguna:</strong>{" "}
                <Badge color="grape" variant="light">
                  {productout.pengguna?.nama_pengguna ?? "-"}
                </Badge>
              </Text>

              <Text size="sm">
                <strong>Jumlah:</strong> {productout.jumlah}
              </Text>

              <Text size="sm">
                <strong>Stok Keluar:</strong> {productout.stok_keluar}
              </Text>

              <Text size="sm">
                <strong>Tanggal Keluar:</strong>{" "}
                {productout.tanggal_keluar
                  ? new Date(productout.tanggal_keluar).toLocaleDateString("id-ID")
                  : "-"}
              </Text>

              <Text size="sm">
                <strong>Catatan:</strong> {productout.catatan || "-"}
              </Text>
            </div>
          </Group>
        </Paper>
      </Paper>
    </Container>
  );
};
