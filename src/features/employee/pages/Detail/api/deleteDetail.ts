import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

const deleteDetail = async (id: number | null | undefined) => {
  const res = await axios.delete(`${BaseURL}/detail_transaksi/${id}`);
  return res.data;
};

export const useDeleteDetail = () => {
  return useMutation({
    mutationFn: (id: number | null | undefined) => deleteDetail(id),
    onError: (error) => {
      console.error(error);
    },
  });
};
