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
import { CategoryType } from "../types";

export const CategoryDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state.category as CategoryType;
  console.log("Data Kategori", category);

  return (
    <Container size="sm" mt="xl">
      <Paper p="xl" shadow="md" radius="md">
        <Title order={2} mb="md">
          Detail Kategori
        </Title>
        <Text>
          <strong>Nama Kategori:</strong>{" "}
          <Badge color="grape" variant="light">
            {category.nama_kategori}
          </Badge>
        </Text>
        <Group mt="xl" justify="flex-end">
          <Button
            variant="default"
            onClick={() => navigate("/data_master/kategori")}
          >
            Kembali
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};
