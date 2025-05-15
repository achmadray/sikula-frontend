import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getMenu(menu_id?: number) {
  const res = await axios.get(`${BaseURL}/menu/${menu_id}`);
  return res.data;
}

export const useGetMenu = (menu_id?: number) => {
  return useQuery({ queryKey: ["menu", menu_id], queryFn: () => getMenu(menu_id) });
}

export async function getAllMenu() {
  const res = await axios.get(`${BaseURL}/menu`);
  return res.data;
}

export const useGetAllMenu = () => {
  return useQuery({ queryKey: ["menu"], queryFn: getAllMenu });
}
