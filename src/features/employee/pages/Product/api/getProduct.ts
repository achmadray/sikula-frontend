import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getProduct(product_id?: number) {
  const res = await axios.get(`${BaseURL}/barang/${product_id}`);
  return res.data;
}

export const useGetProduct = (product_id?: number) => {
  return useQuery({ queryKey: ['product', product_id], queryFn: () => getProduct(product_id) });
}

export async function getAllProduct() {
  const res = await axios.get(`${BaseURL}/barang`);
  return res.data;
}

export const useGetAllProduct = () => {
  return useQuery({ queryKey: ['product'], queryFn: () => getAllProduct() });
}
