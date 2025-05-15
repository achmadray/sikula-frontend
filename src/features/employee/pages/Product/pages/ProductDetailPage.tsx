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
import { ProductType } from "../types";

export const ProductDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state.product as ProductType;
  console.log("Data Barang", product);

  return (
    <Container size="sm" mt="xl">
      <Paper p="xl" shadow="md" radius="md">
        <Title order={2} mb="md">
          Detail Produk
        </Title>
        <Text mb="sm">
          <strong>Kode Barang:</strong>{" "}
          <Badge color="grape" variant="light">
            {product.kode_barang}
          </Badge>
        </Text>
        <Text mb="sm">
          <strong>Nama:</strong> {product.nama_barang}
        </Text>
        <Text mb="sm">
          <strong>Satuan:</strong>{" "}
          <Badge color="grape" variant="light">
            {product.satuan.nama_satuan}
          </Badge>
        </Text>
        <Text mb="sm">
          <strong>Stok:</strong> {product.stok}
        </Text>
        <Text mb="sm">
          <strong>Pelaku:</strong>{" "}
          <Badge color="grape" variant="light">
            {product.pengguna.nama_pengguna}
          </Badge>
        </Text>
        <Group mt="xl" justify="flex-end">
          <Button
            variant="default"
            onClick={() => navigate("/data_master/barang")}
          >
            Kembali
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};
