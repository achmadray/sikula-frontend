// src/features/ProductOut/pages/ProductOutListPage.tsx

import {
  Button,
  Text,
  Container,
  Paper,
  Title,
  Group,
  Loader,
  Modal,
  UnstyledButton,
  Divider,
  Stack,
  Center,
  TextInput,
} from "@mantine/core";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";

import { useGetAllProduct } from "../../Product/api";
import { useAddProductOut } from "../api/addProductOut";
import { useUpdateProduct } from "../../Product/api/updateProduct";
import { ProductType } from "../../Product/types";

import {
  IconCaretLeft,
  IconCaretRight,
  IconHistory,
  IconPlus,
} from "@tabler/icons-react";

export const ProductOutListPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [incomingStok, setIncomingStok] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const navigate = useNavigate();

  const { data: products, isLoading, refetch } = useGetAllProduct();
  const mutationAdd = useAddProductOut();
  const mutationUpdate = useUpdateProduct();

  const form = useForm({
    initialValues: {
      catatan: "",
      tanggal_keluar: new Date(),
    },
    validate: {
      catatan: (value) => (!value ? "Masukkan Catatan" : null),
      tanggal_keluar: (value) => (!value ? "Masukkan Tanggal" : null),
    },
  });

  const handleSubmit = async () => {
    if (!selectedProduct) return alert("Pilih produk terlebih dahulu");
    if (incomingStok <= 0)
      return alert("Jumlah stok keluar harus lebih dari 0");

    const data = {
      id_barang: selectedProduct.id_barang,
      id_pengguna: 1,
      jumlah: incomingStok,
      stok_keluar: incomingStok,
      tanggal_keluar: format(
        new Date(form.values.tanggal_keluar),
        "yyyy-MM-dd"
      ),
      catatan: form.values.catatan,
    };

    try {
      await mutationAdd.mutateAsync(data, {
        onSuccess: async () => {
          const updatedStock = {
            id_barang: selectedProduct.id_barang,
            stok: selectedProduct.stok - incomingStok,
          };

          await mutationUpdate.mutateAsync(updatedStock);
          refetch();
          form.reset();
          close();
        },
      });
    } catch (eror) {
      alert("Gagal menambahkan barang keluar");
    }
  };

  return (
    <Container size="lg" mt="xl">
      <Paper p="lg" shadow="sm" radius="md">
        <Group justify="space-between" mb="md">
          <Title order={2}>Daftar Barang Keluar</Title>
          <Button
            leftSection={<IconHistory size={18} />}
            variant="outline"
            color="gray"
            onClick={() => navigate("/barang_keluar/history")}
          >
            Lihat Riwayat
          </Button>
        </Group>

        <Divider mb="lg" />

        {isLoading ? (
          <Center mt="md">
            <Loader size="lg" variant="dots" />
          </Center>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products?.map((barang) => (
              <Paper
                key={barang.id_barang}
                shadow="md"
                radius="lg"
                p="md"
                withBorder
                onClick={() => {
                  setSelectedProduct(barang);
                  setIncomingStok(0);
                  open();
                }}
                className="cursor-pointer hover:shadow-xl transition-all"
              >
                <Stack spacing={6}>
                  <Text fw={600} size="lg">
                    {barang.nama_barang}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Stok: <strong>{barang.stok}</strong>
                  </Text>
                  <Button
                    leftSection={<IconPlus size={16} />}
                    variant="light"
                    fullWidth
                    mt="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(barang);
                      setIncomingStok(0);
                      open();
                    }}
                  >
                    Tambah Barang Keluar
                  </Button>
                </Stack>
              </Paper>
            ))}
          </div>
        )}
      </Paper>

      <Modal
        opened={opened}
        onClose={close}
        size="sm"
        centered
        withCloseButton
        title="Tambah Barang Keluar"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Text fw={600}>{selectedProduct?.nama_barang}</Text>

            <Group justify="center" spacing="lg">
              <UnstyledButton
                onClick={() => setIncomingStok(Math.max(incomingStok - 1, 0))}
              >
                <IconCaretLeft size={24} />
              </UnstyledButton>
              <Text size="xl" fw={700}>
                {incomingStok}
              </Text>
              <UnstyledButton onClick={() => setIncomingStok(incomingStok + 1)}>
                <IconCaretRight size={24} />
              </UnstyledButton>
            </Group>

            <DatePickerInput
              label="Tanggal Keluar"
              value={form.values.tanggal_keluar}
              onChange={(value) => form.setFieldValue("tanggal_keluar", value!)}
            />

            <TextInput
              label="Catatan"
              placeholder="Contoh: Rusak, Habis dipakai"
              {...form.getInputProps("catatan")}
            />

            <Button type="submit" fullWidth>
              Simpan
            </Button>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
};
