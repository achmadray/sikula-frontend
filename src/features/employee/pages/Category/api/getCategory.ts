import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getCategory(category_id?: number) {
  const res = await axios.get(`${BaseURL}/kategori/${category_id}`);
  return res.data;
}

export const useGetCategory = (category_id?: number) => {
  return useQuery({ queryKey: ['category', category_id], queryFn: () => getCategory(category_id) });
};

export async function getAllCategory() {
  const res = await axios.get(`${BaseURL}/kategori`);
  return res.data;
}

export const useGetAllCategory = () => {
  return useQuery({ queryKey: ['categories'], queryFn: () => getAllCategory() });
};
