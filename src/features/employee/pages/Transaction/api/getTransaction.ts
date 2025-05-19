import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TransaksiType } from "../types";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getTransaction(transaction_id?: number) {
  const res = await axios.get<TransaksiType>(
    `${BaseURL}/transaksi/${transaction_id}`
  );
  return res.data;
}

export const useGetTransaction = (transaction_id?: number) => {
  return useQuery({
    queryKey: ["transaksi", transaction_id],
    queryFn: () => getTransaction(transaction_id),
  });
};

export async function getAllTransaction() {
  const res = await axios.get<TransaksiType[]>(`${BaseURL}/transaksi`);
  return res.data;
}

export const useGetAllTransaction = () => {
  return useQuery({
    queryKey: ["transaksi"],
    queryFn: getAllTransaction,
  });
};
