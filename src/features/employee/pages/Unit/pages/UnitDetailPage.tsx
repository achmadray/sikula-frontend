import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Group,
} from "@mantine/core";


import { UnitType } from "../types";

export const UnitDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const unit = location.state.unit as UnitType;
  console.log("Data Satuan", unit);

  return (
    <Container size="sm" mt="xl">
      <Paper p="xl" shadow="md" radius="md">
        <Title order={2} mb="md">
          Detail Unit
        </Title>
        <Text mb="sm">
          <strong>Nama Satuan:</strong> {unit.nama_satuan}
        </Text>
        <Group mt="xl" justify="flex-end">
          <Button
            variant="default"
            onClick={() => navigate("/data_master/unit")}
          >
            Kembali
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};
