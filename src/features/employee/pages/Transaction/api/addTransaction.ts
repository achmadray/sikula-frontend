import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export interface CreateTransactionRequest {
  id_pengguna: number;
  nama_order: string;
  metode_pembayaran: string;
  total_transaksi: number;
}

export const postAddTransaction = async (transactionData: CreateTransactionRequest) => {
  console.log("Data transaksi yang dikirim:", transactionData);
  const response = await axios.post(`${BaseURL}/transaksi`, transactionData);
  return response.data;
};

export const useAddTransaction = () => {
  return useMutation({
    mutationFn: postAddTransaction,
    onMutate: async (transactionData: CreateTransactionRequest) => {
      console.log("Memulai tambah transaksi:", transactionData);
    },
    onError: (error) => {
      console.error("Error tambah transaksi:", error);
    },
    onSuccess: (data) => {
      console.log("Transaksi berhasil ditambahkan:", data);
    },
  });
};
