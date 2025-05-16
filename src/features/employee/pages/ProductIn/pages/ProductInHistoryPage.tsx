import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Title,
  Group,
  Text,
  Button,
  Loader,
  Stack,
  ScrollArea,
  Center,
  Tooltip,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconEye, IconCalendarEvent, IconPackage } from "@tabler/icons-react";
import { ProductInType } from "../types";
import { useGetAllProductIn } from "../api/getProductIn";
import { format } from "date-fns";

export const ProductInHistoryPage = () => {
  const navigate = useNavigate();
  const { data: productInsData, isLoading } = useGetAllProductIn();
  const [productIns, setProductIns] = useState<ProductInType[]>([]);

  useEffect(() => {
    if (productInsData) {
      console.log("Data barang masuk:", productInsData);
      const sorted = [...productInsData].sort((a, b) =>
        b.tanggal_masuk.localeCompare(a.tanggal_masuk)
      );
      setProductIns(sorted);
    }
  }, [productInsData]);

  return (
    <Container size="lg" mt="xl" mb="xl">
      <Group justify="apart" mb="lg">
        <Title order={2}>Riwayat Barang Masuk</Title>
        <Button variant="outline" onClick={() => navigate("/barang_masuk")}>
          Kembali ke Daftar
        </Button>
      </Group>

      <Paper shadow="sm" p="lg" radius="md" withBorder>
        {isLoading ? (
          <Center py="xl">
            <Loader size="xl" variant="dots" />
          </Center>
        ) : productIns.length === 0 ? (
          <Center py="xl">
            <Text color="dimmed" size="lg">
              Belum ada riwayat barang masuk.
            </Text>
          </Center>
        ) : (
          <ScrollArea style={{ height: 600 }}>
            <Stack spacing="md">
              {productIns.map((item) => (
                <Paper
                  key={item.id_barang_masuk}
                  p="md"
                  withBorder
                  radius="md"
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() =>
                    navigate("/barang_masuk/detail", { state: { productin: item } })
                  }
                >
                  <Group justify="apart" align="center" noWrap style={{ gap: 8 }}>
                    <Stack spacing={4} style={{ flex: 1, minWidth: 0 }}>
                      <Group noWrap style={{ gap: 4 }}>
                        <IconPackage size={20} />
                        <Text
                          size="md"
                          fw={600}
                          lineClamp={1}
                          title={item.barang?.nama_barang}
                        >
                          {item.barang?.nama_barang ?? "-"}
                        </Text>
                      </Group>

                      <Text size="sm" color="dimmed" lineClamp={1}>
                        <strong>Stok Masuk:</strong> {item.stok_masuk}
                      </Text>

                      <Group noWrap style={{ gap: 6 }}>
                        <IconCalendarEvent size={16} color="#868e96" />
                        <Text size="sm" color="dimmed" lineClamp={1}>
                          <strong>Tanggal Masuk:</strong>{" "}
                          {item.tanggal_masuk
                            ? format(new Date(item.tanggal_masuk), "dd MMM yyyy")
                            : "-"}
                        </Text>
                      </Group>
                    </Stack>

                    <Tooltip label="Lihat Detail" withArrow position="left" color="blue">
                      <Button
                        variant="light"
                        color="blue"
                        size="xs"
                        leftSection={<IconEye size={16} />}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/barang_masuk/detail", { state: { productin: item } });
                        }}
                      >
                        Detail
                      </Button>
                    </Tooltip>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </ScrollArea>
        )}
      </Paper>
    </Container>
  );
};
