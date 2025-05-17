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
import { IconEye, IconCalendarEvent, IconPackageExport } from "@tabler/icons-react";
import { ProductOutType } from "../types";
import { useGetAllProductOut } from "../api/getProductOut";
import { format } from "date-fns";

export const ProductOutHistoryPage = () => {
  const navigate = useNavigate();
  const { data: productOutsData, isLoading } = useGetAllProductOut();
  const [productOuts, setProductOuts] = useState<ProductOutType[]>([]);

  useEffect(() => {
    if (productOutsData) {
      console.log("Data barang keluar:", productOutsData);
      const sorted = [...productOutsData].sort((a, b) =>
        b.tanggal_keluar.localeCompare(a.tanggal_keluar)
      );
      setProductOuts(sorted);
    }
  }, [productOutsData]);

  return (
    <Container size="lg" mt="xl" mb="xl">
      <Group justify="apart" mb="lg">
        <Title order={2}>Riwayat Barang Keluar</Title>
        <Button variant="outline" onClick={() => navigate("/barang_keluar")}>
          Kembali ke Daftar
        </Button>
      </Group>

      <Paper shadow="sm" p="lg" radius="md" withBorder>
        {isLoading ? (
          <Center py="xl">
            <Loader size="xl" variant="dots" />
          </Center>
        ) : productOuts.length === 0 ? (
          <Center py="xl">
            <Text color="dimmed" size="lg">
              Belum ada riwayat barang keluar.
            </Text>
          </Center>
        ) : (
          <ScrollArea style={{ height: 600 }}>
            <Stack spacing="md">
              {productOuts.map((item) => (
                <Paper
                  key={item.id_barang_keluar}
                  p="md"
                  withBorder
                  radius="md"
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() =>
                    navigate("/barang_keluar/detail", { state: { productout: item } })
                  }
                >
                  <Group justify="apart" align="center" noWrap style={{ gap: 8 }}>
                    <Stack spacing={4} style={{ flex: 1, minWidth: 0 }}>
                      <Group noWrap style={{ gap: 4 }}>
                        <IconPackageExport size={20} />
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
                        <strong>Stok Keluar:</strong> {item.stok_keluar}
                      </Text>

                      <Group noWrap style={{ gap: 6 }}>
                        <IconCalendarEvent size={16} color="#868e96" />
                        <Text size="sm" color="dimmed" lineClamp={1}>
                          <strong>Tanggal Keluar:</strong>{" "}
                          {item.tanggal_keluar
                            ? format(new Date(item.tanggal_keluar), "dd MMM yyyy")
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
                          navigate("/barang_keluar/detail", { state: { productout: item } });
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
