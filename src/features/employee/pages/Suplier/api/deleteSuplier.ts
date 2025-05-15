import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

const deleteSuplier = async (id: number | undefined | null) => {
  const response = await axios.delete(`${BaseURL}/suplier/${id}`);
  return response.data;
};

export const useDeleteSuplier = () => {
  return useMutation({
    mutationFn: (id: number | undefined | null) => deleteSuplier(id),
    onError: (error) => {
      console.log(error);
    },
  });
};
