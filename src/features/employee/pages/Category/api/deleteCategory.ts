import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: async (id_kategori: number | undefined) => {
      const res = await axios.delete(`${BaseURL}/kategori/${id_kategori}`);
      return res.data;
    },
  });
};
