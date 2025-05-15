import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

const deleteProduct = async (id: number | undefined | null) => {
  const response = await axios.delete(`${BaseURL}/barang/${id}`);
  return response.data;
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: number | undefined | null) => deleteProduct(id),
    onError: (error) => {
      console.log(error);
    },
  });
};
