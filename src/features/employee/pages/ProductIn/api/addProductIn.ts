import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type CreateIncomingProductRequest = {
  id_barang?: number;
  id_suplier: number;
  harga: number;
  stok_masuk: number;
  jumlah: number;
  tanggal_masuk: string;
};
export const postAddIncomingProduct = async (
  productData: CreateIncomingProductRequest
) => {
  console.log("Data yang dikirim:", productData);
  const response = await axios.post(`${BaseURL}/barang_masuk`, productData);
  return response.data;
};

export const useAddIncomingProduct = () => {
  return useMutation({
    mutationFn: postAddIncomingProduct,
    onMutate: async (productData: CreateIncomingProductRequest) => {
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
