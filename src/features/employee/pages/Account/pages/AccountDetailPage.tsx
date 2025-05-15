import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Loader,
  Group,
  Badge,
} from "@mantine/core";

interface Account {
  id_akun: number;
  username: string;
  level: string;
}

export const AccountDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/akun/${id}`);
        if (!res.ok) throw new Error("Terjadi kesalahan saat mengambil data");
        const json = await res.json();
        setAccount(json);
      } catch (err) {
        console.error("Gagal mengambil detail akun:", err);
        setError("Gagal mengambil detail akun");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAccount();
  }, [id]);

  if (loading) {
    return (
      <Group justify="center" mt="xl">
        <Loader size="lg" />
      </Group>
    );
  }

  if (error || !account) {
    return (
      <Text color="red" style={{ textAlign: "center" }}>
        {error || "Data kategori tidak ditemukan."}
      </Text>
    );
  }

  return (
    <Container size="sm" mt="xl">
      <Paper p="xl" shadow="md" radius="md">
        <Title order={2} mb="md">
          Detail Akun
        </Title>
        <Text mb="sm">
          <strong>Username:</strong> {account.username}
        </Text>
        <Text>
          <strong>Level:</strong>{" "}
          <Badge color="blue" variant="light" size="lg">
            {account.level}
          </Badge>
        </Text>

        <Group mt="xl" justify="flex-end">
          <Button variant="default" onClick={() => navigate("/akun")}>
            Kembali
          </Button>
          <Button
            color="blue"
            onClick={() =>
              navigate(`/akun/edit/${account.id_akun}`, {
                state: { account },
              })
            }
          >
            Edit
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};
