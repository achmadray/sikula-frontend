import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getPenggunaByAkunId(pengguna_id?: number) {
  if (!pengguna_id) return null;
  const res = await axios.get(`${BaseURL}/pengguna/${pengguna_id}`);
  return res.data;
}

export const useGetPenggunaByAkunId = (pengguna_id?: number) => {
  return useQuery({
    queryKey: ["pengguna", pengguna_id],
    queryFn: () => getPenggunaByAkunId(pengguna_id),
    enabled: Boolean(pengguna_id),
  });
};

export async function getAllPengguna() {
  const res = await axios.get(`${BaseURL}/pengguna`);
  return res.data;
}

export const useGetAllPengguna = () => {
  return useQuery({ queryKey: ["pengguna"], queryFn: () => getAllPengguna() });
};
