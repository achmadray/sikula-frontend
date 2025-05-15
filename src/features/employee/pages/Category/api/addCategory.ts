import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type categoryPost = {
  nama_kategori: string;
};

export const postAddCategory = async (categoryPost: categoryPost) => {
  console.log("Data kategori dikirim:", categoryPost);
  const response = await axios.post(`${BaseURL}/kategori`, categoryPost);
  return response.data;
};

export const useAddCategory = () => {
  return useMutation({
    mutationFn: postAddCategory,
    onMutate: async (categoryPost: categoryPost) => {
      console.log("Sedang menambahkan kategori:", categoryPost);
    },
    onError: (error) => {
      console.error("Terjadi kesalahan saat menambahkan kategori:", error);
    },
  });
};
