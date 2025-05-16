import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Group,
  Badge,
} from "@mantine/core";
import { ProductInType } from "../types";

export const ProductInDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productin = location.state.productin as ProductInType;
  console.log("Data Barang Masuk", productin);

  return (
    <Container size="sm" mt="xl">
      <Paper p="xl" shadow="md" radius="md">
        <Title order={2} mb="md">
          Detail Barang Masuk
        </Title>
        <Text mb="sm">
          <strong>Harga:</strong>
          {productin.harga}
        </Text>
        <Text mb="sm">
          <strong>jumlah:</strong> {productin.jumlah}
        </Text>
        <Text mb="sm">
          <strong>Total Harga:</strong> {productin.total_harga}
        </Text>
        <Text mb="sm">
          <strong>Stok Masuk:</strong> {productin.stok_masuk}
        </Text>
        <Text mb="sm">
          <strong>Tanggal Masuk:</strong> {productin.tanggal_masuk}
        </Text>
        <Text mb="sm">
          <strong>Nama Barang:</strong>{" "}
          <Badge color="grape" variant="light">
            {productin.product.nama_barang}
          </Badge>
        </Text>
        <Text mb="sm">
          <strong>Suplier:</strong>{" "}
          <Badge color="grape" variant="light">
            {productin.suplier.nama_suplier}
          </Badge>
        </Text>
        <Group mt="xl" justify="flex-end">
          <Button
            variant="default"
            onClick={() => navigate("barang_masuk")}>
            Kembali
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};
