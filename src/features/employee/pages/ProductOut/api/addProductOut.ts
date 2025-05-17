import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type CreateProductOutRequest = {
  id_barang: number;
  id_pengguna: number;
  jumlah: number;
  stok_keluar: number;
  tanggal_keluar: string;
  catatan?: string;
};

export const postAddProductOut = async (
  productData: CreateProductOutRequest
) => {
  console.log("Data dikirim ke backend:", productData);
  const response = await axios.post(`${BaseURL}/barang_keluar`, productData);
  return response.data;
};

export const useAddProductOut = () => {
  return useMutation({
    mutationFn: postAddProductOut,
    onError: (error) => {
      console.error("Error saat menambahkan:", error);
    },
    onSuccess: (data) => {
      console.log("Barang keluar berhasil ditambahkan:", data);
    },
  });
};
