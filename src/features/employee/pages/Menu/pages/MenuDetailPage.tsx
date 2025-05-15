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
import { MenuType } from "../types";

export const MenuDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const menu = location.state.menu as MenuType;
  console.log("Data Menu", menu);

  return (
    <Container size="sm" mt="xl">
      <Paper p="xl" shadow="md" radius="md">
        <Title order={2} mb="md">
          Detail Menu
        </Title>
        <Text>
          <strong>Nama Menu:</strong>{" "}
          <Badge color="grape" variant="light">
            {menu.nama_menu}
          </Badge>
        </Text>
        <Text>
          <strong>Harga:</strong> Rp {menu.harga.toLocaleString()}
        </Text>
        <Group mt="xl" justify="flex-end">
          <Button
            variant="default"
            onClick={() => navigate("/data_master/menu")}
          >
            Kembali
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};
