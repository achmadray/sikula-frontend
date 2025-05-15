import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

const deleteUnit = async (id: number | undefined | null) => {
  const response = await axios.delete(`${BaseURL}/satuan/${id}`);
  return response.data;
};

export const useDeleteUnit = () => {
  return useMutation({
    mutationFn: (id: number | undefined | null) => deleteUnit(id),
    onError: (error) => {
      console.log(error);
    },
  });
};
