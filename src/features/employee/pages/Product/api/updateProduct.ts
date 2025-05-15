import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const BaseURL = import.meta.env.VITE_API_URL;

type UpdateProductRequest = {
  id_barang?: number;
  nama_barang?: string;
  id_satuan?: number;
  id_pengguna?: number;
  kode_barang?: string;
  stok?: number | undefined;
};
export async function updateProduct(data: UpdateProductRequest) {
  const res = await axios.put(`${BaseURL}/barang/${data.id_barang}`, data);
  return res.data.data;
}

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: updateProduct,
  });
};
