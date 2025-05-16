import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getProductIn(productin_id?: number) {
  const res = await axios.get(`${BaseURL}/barang_masuk/${productin_id}`);
  return res.data;
}

export const useGetProductIn = (productin_id?: number) => {
  return useQuery({ queryKey: ['productin', productin_id], queryFn: () => getProductIn(productin_id) });
}

export async function getAllProductIn() {
  const res = await axios.get(`${BaseURL}/barang_masuk`);
  return res.data;
}

export const useGetAllProductIn = () => {
  return useQuery({ queryKey: ['productin'], queryFn: () => getAllProductIn() });
}
