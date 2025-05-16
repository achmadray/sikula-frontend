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
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconEye } from "@tabler/icons-react";
import { ProductInType } from "../types";
import { useGetAllProductIn } from "../api/getProductIn";

export const ProductListPage = () => {
  const navigate = useNavigate();
  const [productins, setProductIns] = useState<ProductInType[]>([]);
  const { data: DataProductIns, isLoading: LoadingProductIn } =
    useGetAllProductIn();

  useEffect(() => {
    if (DataProductIns) {
      setProductIns(DataProductIns);
    }
  }, [DataProductIns]);

  return (
    <Container size="lg" mt="xl">
      <Paper p="lg" shadow="sm" radius="md">
        <Group justify="apart" mb="md">
          <Title order={2}>Daftar Barang</Title>
          <Button
            color="green"
            onClick={() => navigate("/barang_masuk/tambah")}
          >
            Tambah Barang Masuk
          </Button>
        </Group>

        {LoadingProductIn ? (
          <Group justify="center" style={{ marginTop: "20px" }}>
            <Loader size="xl" variant="dots" />
          </Group>
        ) : (
          productins.map((productin) => (
            <div
              key={productin.id_barang}
              className="flex justify-between mb-4 p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <Text size="lg" fw={600}>
                    {"Harga"}
                    {productin.harga}
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Text size="lg" fw={600}>
                    {"Jumlah"}
                    {productin.jumlah}
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Text size="lg" fw={600}>
                    {"Total Harga"}
                    {productin.total_harga}
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Text size="lg" fw={600}>
                    {"Stok Masuk"}
                    {productin.stok_masuk}
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Text size="lg" fw={600}>
                    {"Tanggal Masuk"}
                    {productin.tanggal_masuk}
                  </Text>
                </div>
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
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="subtle"
                  color="gray"
                  onClick={() =>
                    navigate(`/barang_masuk/detail`, {
                      state: { productin },
                    })
                  }
                  size="xs"
                >
                  <IconEye />
                </Button>
              </div>
            </div>
          ))
        )}
      </Paper>
    </Container>
  );
};
