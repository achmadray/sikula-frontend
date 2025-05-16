import { useEffect, useState } from "react";
import {
  Button,
  Text,
  Container,
  Paper,
  Group,
  Badge,
  Loader,
  Title,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductInType } from "../types";
import { useGetAllProductIn } from "../api/getProductIn";

export const ProductInDetailPage = () => {
  const navigate = useNavigate();
  const location= useLocation();
  const productin = location.state.productin as ProductInType
  const [productins, setProductIns] = useState<ProductInType[]>([]);
  const { data: DataProductIns, isLoading: LoadingProductIn } =
    useGetAllProductIn();

  useEffect(() => {
    if (DataProductIns) {
      setProductIns(DataProductIns);
    }
  }, [DataProductIns]);
  console.log("data yang masuk", productins);

  return (
    <Container size="lg" mt="xl">
      <Group p="apart" mb="lg">
        <Title order={3}>Detail Barang Masuk</Title>
        <Button variant="outline" onClick={() => navigate("/barang_masuk")}>
          Kembali ke Daftar
        </Button>
      </Group>

      <Paper p="lg" shadow="sm" radius="md">
        {LoadingProductIn ? (
          <Group justify="center" mt="md">
            <Loader size="xl" variant="dots" />
          </Group>
        ) : (
          
            <Paper
              key={productin.id_barang}
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
                      {productin.product?.nama_barang ?? "-"}
                    </Badge>
                  </Text>
                  <Text size="sm">
                    <strong>Suplier:</strong>{" "}
                    <Badge color="grape" variant="light">
                      {productin.suplier?.nama_suplier ?? "-"}
                    </Badge>
                  </Text>

                  <Text size="sm">
                    <strong>Harga:</strong> Rp {productin.harga}
                  </Text>
                  <Text size="sm">
                    <strong>Jumlah:</strong> {productin.jumlah}
                  </Text>
                  <Text size="sm">
                    <strong>Total Harga:</strong> Rp {productin.total_harga}
                  </Text>
                  <Text size="sm">
                    <strong>Stok Masuk:</strong> {productin.stok_masuk}
                  </Text>
                  <Text size="sm">
                    <strong>Tanggal Masuk:</strong> {productin.tanggal_masuk}
                  </Text>
                </div>
              </Group>
            </Paper>
        
        )}
      </Paper>
    </Container>
  );
};
