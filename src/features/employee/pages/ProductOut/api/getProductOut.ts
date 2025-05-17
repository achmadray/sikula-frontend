import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getProductOut(productout_id?: number) {
  const res = await axios.get(`${BaseURL}/barang_keluar/${productout_id}`);
  return res.data;
}

export const useGetProductOut = (productout_id?: number) => {
  return useQuery({ queryKey: ['productout', productout_id], queryFn: () => getProductOut(productout_id) });
}

export async function getAllProductOut() {
  const res = await axios.get(`${BaseURL}/barang_keluar`);
  return res.data;
}

export const useGetAllProductOut = () => {
  return useQuery({ queryKey: ['productout'], queryFn: () => getAllProductOut() });
}
