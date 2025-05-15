import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

const deleteAccount = async (id: number | undefined | null) => {
  const response = await axios.delete(`${BaseURL}/akun/${id}`);
  return response.data;
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: (id: number | undefined | null) => deleteAccount(id),
    onError: (error) => {
      console.log(error);
    },
  });
};