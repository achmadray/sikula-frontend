import axios from "axios";
import { ProductType } from "../types";
import { useMutation } from "@tanstack/react-query";

const BaseURL = import.meta.env.VITE_API_URL;

export async function updateProduct(data: ProductType) {
    const res = await axios.put(`${BaseURL}/barang/${data.id_barang}`, data);
    return res.data.data;
}

export const useUpdateProduct = () => {
    return useMutation({
        mutationFn: updateProduct,
    });
};
