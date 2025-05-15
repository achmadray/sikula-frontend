import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Group,
} from "@mantine/core";
import { SuplierType } from "../types";

export const SuplierDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const suplier = location.state.suplier as SuplierType;
  console.log("data suplier", suplier);

  return (
    <Container size="sm" mt="xl">
      <Paper p="xl" shadow="md" radius="md">
        <Title order={2} mb="md">
          Detail Akun
        </Title>
        <Text >
          <strong>Nama Suplier:</strong> {suplier.nama_suplier}
        </Text>
        <Text>
          <strong>Alamat:</strong>
          {suplier.alamat}
        </Text>
        <Text>
          <strong>No Telpon:</strong>
          {suplier.no_telpon}
        </Text>
        <Group mt="xl" justify="flex-end">
          <Button variant="default" onClick={() => navigate("/data_master/suplier")}>
            Kembali
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};
