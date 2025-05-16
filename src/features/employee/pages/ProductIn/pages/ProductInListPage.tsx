import { useEffect, useState } from "react";
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
  Select,
  NumberInput,
  Divider,
  Stack,
  Center,
} from "@mantine/core";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useGetAllProduct } from "../../Product/api";
import { ProductType } from "../../Product/types";
import {
  IconCaretLeft,
  IconCaretRight,
  IconHistory,
  IconPlus,
} from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useAddIncomingProduct } from "../api/addProductIn";
import { SuplierType, useGetAllSuplier } from "../../Suplier";
import { useUpdateProduct } from "../../Product/api/updateProduct";

export const ProductInListPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState<SuplierType[]>([]);
  const { data: DataSupplier } = useGetAllSuplier();
  useEffect(() => {
    if (DataSupplier) setSuppliers(DataSupplier);
  }, [DataSupplier]);

  const [products, setProducts] = useState<ProductType[]>([]);
  const {
    data: DataProducts,
    isLoading: LoadingProduct,
    refetch: RefetchProducts,
  } = useGetAllProduct();

  useEffect(() => {
    if (DataProducts) setProducts(DataProducts);
  }, [DataProducts]);

  const [selectedProduct, setSelectedProduct] = useState<ProductType>();
  const [incomingStok, setIncomingStok] = useState<number>(0);

  useEffect(() => setIncomingStok(0), [opened]);

  const handleIncrease = () => setIncomingStok((prev) => prev + 1);
  const handleDecrease = () =>
    setIncomingStok((prev) => (prev > 0 ? prev - 1 : 0));

  const mutationUpdateProduct = useUpdateProduct();
  const handleUpdateStok = async () => {
    if (!selectedProduct) return;
    const UpdateStokRequest = {
      id_barang: selectedProduct.id_barang,
      stok: selectedProduct.stok
        ? selectedProduct.stok + incomingStok
        : incomingStok,
    };
    await mutationUpdateProduct.mutateAsync(UpdateStokRequest, {
      onSuccess: () => {
        RefetchProducts();
        close();
      },
    });
  };

  const form = useForm({
    initialValues: {
      harga: 0,
      id_supplier: "",
      tanggal_masuk: "",
    },
    validate: {
      harga: (value) => (value < 1 ? "Harga harus lebih dari 0" : null),
      id_supplier: (value) => (!value ? "Pilih supplier" : null),
      tanggal_masuk: (value) => (!value ? "Tanggal masuk harus diisi" : null),
    },
  });

  const mutationAddProduct = useAddIncomingProduct();

  const handleFormSubmit = form.onSubmit(async (values) => {
    if (!selectedProduct) {
      alert("Pilih produk terlebih dahulu");
      return;
    }

    if (incomingStok <= 0) {
      alert("Stok masuk harus lebih dari 0");
      return;
    }

    const incomingProductData = {
      id_barang: selectedProduct.id_barang,
      id_suplier: parseInt(values.id_supplier),
      harga: values.harga,
      jumlah: incomingStok,
      stok_masuk: incomingStok,
      total_harga: incomingStok * values.harga,
      tanggal_masuk: format(new Date(values.tanggal_masuk), "yyyy-MM-dd"),
    };

    try {
      await mutationAddProduct.mutateAsync(incomingProductData, {
        onSuccess: () => {
          handleUpdateStok();
          form.reset();
        },
      });
    } catch (error) {
      alert("Gagal menyimpan data, coba lagi.");
      console.error(error);
    }
  });

  return (
    <Container size="lg" mt="xl">
      <Paper p="lg" shadow="sm" radius="md">
        <Group justify="space-between" mb="md">
          <Title order={2}>Daftar Barang Masuk</Title>
          <Button
            leftSection={<IconHistory size={18} />}
            color="gray"
            variant="outline"
            onClick={() => navigate("/barang_masuk/history")}
          >
            Lihat History
          </Button>
        </Group>

        <Divider mb="lg" />

        {LoadingProduct ? (
          <Center mt="md">
            <Loader size="xl" variant="dots" />
          </Center>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <Paper
                key={product.id_barang}
                shadow="md"
                radius="lg"
                withBorder
                p="md"
                className="hover:shadow-xl transition-all cursor-pointer"
                onClick={() => {
                  open();
                  setSelectedProduct(product);
                }}
              >
                <Stack spacing={4}>
                  <Text size="lg" fw={600}>
                    {product.nama_barang}
                  </Text>

                  <Text size="sm" c="dimmed">
                    Stok: <strong>{product.stok}</strong>
                  </Text>

                  <Button
                    leftSection={<IconPlus size={16} />}
                    variant="light"
                    fullWidth
                    mt="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      open();
                      setSelectedProduct(product);
                    }}
                  >
                    Tambah Stok
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
        withCloseButton
        size="sm"
        centered
        padding="md"
        transitionProps={{ transition: "slide-up" }}
      >
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={16}>
            <Text align="center" size="xl" fw={700} mb="xs">
              Tambah Barang Masuk
            </Text>

            <Text align="center" size="lg" fw={600} c="dimmed" mb="sm">
              {selectedProduct?.nama_barang ?? "Nama Barang"}
            </Text>

            <Group justify="center" align="center" spacing="xl" mb="md">
              <UnstyledButton
                onClick={handleDecrease}
                style={{
                  borderRadius: "50%",
                  border: "2px solid #1971c2",
                  padding: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s",
                  color: "#1971c2",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1971c2";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#1971c2";
                }}
                aria-label="Kurangi jumlah"
                type="button"
              >
                <IconCaretLeft size={28} stroke={3} />
              </UnstyledButton>

              <Text
                size="xl"
                fw={700}
                style={{ minWidth: 50, textAlign: "center" }}
              >
                {incomingStok}
              </Text>

              <UnstyledButton
                onClick={handleIncrease}
                style={{
                  borderRadius: "50%",
                  border: "2px solid #1971c2",
                  padding: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s",
                  color: "#1971c2",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1971c2";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#1971c2";
                }}
                aria-label="Tambah jumlah"
                type="button"
              >
                <IconCaretRight size={28} stroke={3} />
              </UnstyledButton>
            </Group>

            <NumberInput
              label="Harga Satuan (Rp)"
              placeholder="Masukkan harga"
              required
              min={1}
              {...form.getInputProps("harga")}
            />

            <DatePickerInput
              label="Tanggal Masuk"
              placeholder="Pilih tanggal"
              required
              {...form.getInputProps("tanggal_masuk")}
            />

            <Select
              label="Supplier"
              placeholder="Pilih supplier"
              data={suppliers.map((s) => ({
                value: s.id_suplier.toString(),
                label: s.nama_suplier,
              }))}
              required
              {...form.getInputProps("id_supplier")}
            />

            <Button fullWidth size="md" type="submit" mt="md">
              Simpan
            </Button>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
};
