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
import { ProductInType } from "../types";

export const ProductInDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const productin = location.state?.productin as ProductInType | undefined;

  if (!productin) {
    return (
      <Container size="lg" mt="xl" style={{ textAlign: "center" }}>
        <Text color="red" size="lg" mb="md">
          Data barang masuk tidak tersedia.
        </Text>
        <Button onClick={() => navigate("/barang_masuk")}>
          Kembali ke Daftar
        </Button>
      </Container>
    );
  }

  return (
    <Container size="lg" mt="xl">
      <Group justify="space-between" mb="lg">
        <Title order={3}>Detail Barang Masuk</Title>
        <Button variant="outline" onClick={() => navigate("/barang_masuk")}>
          Kembali ke Daftar
        </Button>
      </Group>

      <Paper p="lg" shadow="sm" radius="md">
        <Paper
          withBorder
          radius="md"
          p="md"
          mb="md"
          className="hover:shadow-md transition-all"
        >
          <Group justify="apart" align="start">
            <div className="flex flex-col gap-2">
              <Text size="sm">
                <strong>Nama Barang:</strong>{" "}
                <Badge color="grape" variant="light">
                  {productin.barang?.nama_barang ?? "-"}
                </Badge>
              </Text>

              <Text size="sm">
                <strong>Suplier:</strong>{" "}
                <Badge color="grape" variant="light">
                  {productin.suplier?.nama_suplier ?? "-"}
                </Badge>
              </Text>

              <Text size="sm">
                <strong>Pengguna:</strong>{" "}
                <Badge color="grape" variant="light">
                  {productin.pengguna?.nama_pengguna ?? "-"}
                </Badge>
              </Text>

              <Text size="sm">
                <strong>Harga:</strong> Rp{" "}
                {productin.harga?.toLocaleString() ?? "-"}
              </Text>

              <Text size="sm">
                <strong>Jumlah:</strong> {productin.jumlah ?? "-"}
              </Text>

              <Text size="sm">
                <strong>Total Harga:</strong> Rp{" "}
                {productin.total_harga?.toLocaleString() ?? "-"}
              </Text>

              <Text size="sm">
                <strong>Stok Masuk:</strong> {productin.stok_masuk ?? "-"}
              </Text>

              <Text size="sm">
                <strong>Tanggal Masuk:</strong>{" "}
                {productin.tanggal_masuk
                  ? new Date(productin.tanggal_masuk).toLocaleDateString(
                      "id-ID"
                    )
                  : "-"}
              </Text>
            </div>
          </Group>
        </Paper>
      </Paper>
    </Container>
  );
};
