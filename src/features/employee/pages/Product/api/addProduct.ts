import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ProductType } from "../types"; 

const BaseURL = import.meta.env.VITE_API_URL;

export const postAddProduct = async (productData: ProductType) => {
  console.log("Data yang dikirim:", productData);
  const response = await axios.post(`${BaseURL}/barang`, productData);
  return response.data;
};

export const useAddProduct = () => {
  return useMutation({
    mutationFn: postAddProduct,
    onMutate: async (productData: ProductType) => {
      console.log("Mutating data:", productData);
    },
    onError: (error) => {
      console.log("Error:", error);
    },
    onSuccess: (data) => {
      console.log("Product successfully added:", data);
    },
  });
};
