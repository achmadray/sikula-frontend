import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

const deleteTransaction = async (id: number | undefined | null) => {
  const response = await axios.delete(`${BaseURL}/transaksi/${id}`);
  return response.data;
};

export const useDeleteTransaction = () => {
  return useMutation({
    mutationFn: (id: number | undefined | null) => deleteTransaction(id),
    onError: (error) => {
      console.error("Gagal menghapus transaksi:", error);
    },
  });
};
