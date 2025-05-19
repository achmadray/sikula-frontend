import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
interface CreateProductRequest {
  nama_barang: string;
  kode_barang: string;
  id_satuan: number;
  stok: number;
  id_pengguna: number;
}

export const postAddProduct = async (productData: CreateProductRequest) => {
  console.log("Data yang dikirim:", productData);
  const response = await axios.post(`${BaseURL}/barang`, productData);
  return response.data;
};

export const useAddProduct = () => {
  return useMutation({
    mutationFn: postAddProduct,
    onMutate: async (productData: CreateProductRequest) => {
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
