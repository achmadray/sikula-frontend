import axios from "axios";
import { MenuType } from "../types";
import { useMutation } from "@tanstack/react-query";

const BaseURL = import.meta.env.VITE_API_URL;

export async function updateMenu(data: MenuType) {
  const res = await axios.put(`${BaseURL}/menu/${data.id_menu}`, data);
  return res.data.data;
}

export const useUpdateMenu = () => {
  return useMutation({
    mutationFn: updateMenu,
  });
};
