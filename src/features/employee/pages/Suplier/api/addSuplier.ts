import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type suplierPost = {
  nama_suplier: string;
  no_telpon: string;
  alamat: string;
};

export const postAddSuplier = async (suplierPost: suplierPost) => {
  console.log("Data yang dikirim : ", suplierPost);
  const response = await axios.post(`${BaseURL}/suplier`, suplierPost);
  return response.data;
};

export const useAddSuplier = () => {
  return useMutation({
    mutationFn: postAddSuplier,
    onMutate: async (suplierPost: suplierPost) => {
      console.log(suplierPost);
    },
    onError: (error) => {
      console.log("error :", error);
    },
  });
};
