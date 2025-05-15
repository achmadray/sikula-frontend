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
  Modal,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useGetAllAccount } from "../api";
import { AccountType } from "../types";
import Swal from "sweetalert2";
import { useDeleteAccount } from "../api/deleteAccount";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";

interface Account {
  id_akun: number;
  username: string;
  level: string;
}

export const AccountListPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { data: DataAccounts, isLoading: LoadingAccount } = useGetAllAccount();
  useEffect(() => {
    if (DataAccounts) {
      setAccounts(DataAccounts);
    }
  }, [DataAccounts]);
  console.log("Data akun :", accounts);

  const [accountToDelete, setAccountToDelete] = useState<AccountType>();
  const openDeleteModal = (account: AccountType) => {
    setAccountToDelete(account);
    open();
  };

  const deleteAccountMutation = useDeleteAccount();
  const deleteAccount = async () => {
    deleteAccountMutation.mutateAsync(accountToDelete?.id_akun, {
      onSuccess: (data) => {
        console.log("Success Delete:", data);
        const newEducation = accounts.filter(
          (account) => account.id_akun !== accountToDelete?.id_akun
        );
        setAccounts(newEducation);
        close();
        Swal.fire({
          width: "80%",
          title: "Data pendidikan berhasil dihapus!",
          timer: 3000,
          icon: "success",
          confirmButtonText: "Ok",
        });
      },
    });
  };

  return (
    <Container size="lg" mt="xl">
      <Paper p="lg" shadow="sm" radius="md">
        <Group justify="apart" mb="md">
          <Title order={2}>Daftar Akun</Title>
          <Button color="green" onClick={() => navigate("/akun/tambah")}>
            Tambah Akun
          </Button>
        </Group>

        {LoadingAccount ? (
          <Group justify="center" style={{ marginTop: "20px" }}>
            <Loader size="xl" variant="dots" />
          </Group>
        ) : (
          accounts.map((account) => (
            <div
              key={account.id_akun}
              className="flex justify-between mb-4 p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <Text size="lg" fw={600}>
                    {account.username}
                  </Text>
                </div>
                <Badge
                  size="sm"
                  color="blue"
                  radius="sm"
                  style={{ marginTop: "5px" }}
                >
                  {account.level}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="subtle"
                  color="gray"
                  onClick={() => navigate(`/akun/detail/${account.id_akun}`)}
                  size="xs"
                >
                  <IconEye />
                </Button>
                <Button
                  variant="light"
                  color="blue"
                  onClick={() =>
                    navigate(`/akun/edit/${account.id_akun}`, {
                      state: { account },
                    })
                  }
                  size="xs"
                >
                  <IconPencil />
                </Button>
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => openDeleteModal(account)}
                  size="xs"
                >
                  <IconTrash />
                </Button>
              </div>
            </div>
          ))
        )}
      </Paper>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title={<span className="font-bold">Konfirmasi Hapus ?</span>}
      >
        <div>
          <span>Apakah anda yakin ingin menghapus data pendidikan</span>
          <span className="font-semibold text-blue-600">
            {" "}
            {accountToDelete?.username}
          </span>
        </div>
        <div className="pt-10 flex gap-2 justify-end">
          {deleteAccountMutation.isPending ? (
            <Button color="red" disabled>
              Loading...
            </Button>
          ) : (
            <Button onClick={deleteAccount}>Yakin</Button>
          )}
          <Button color="red" onClick={close}>
            Batal
          </Button>
        </div>
      </Modal>
    </Container>
  );
};
