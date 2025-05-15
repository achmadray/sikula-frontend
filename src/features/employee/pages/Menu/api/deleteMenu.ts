import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const BaseURL = import.meta.env.VITE_API_URL;

const deleteMenu = async (id: number | undefined | null) => {
  const res = await axios.delete(`${BaseURL}/menu/${id}`);
  return res.data;
};

export const useDeleteMenu = () => {
  return useMutation({
    mutationFn: deleteMenu,
    onError: (error) => {
      console.error("Gagal menghapus menu:", error);
    },
  });
};
