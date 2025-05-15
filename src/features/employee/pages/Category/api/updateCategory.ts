import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const BaseURL = import.meta.env.VITE_API_URL;

type updateCategoryRequest = {
    id_kategori: number
    nama_kategori?: string
}

export async function updateCategory(data: updateCategoryRequest) {
    console.log("data yang dikirim :", data)
    const res = await axios.put(`${BaseURL}/kategori/${data.id_kategori}`, data);
    return res.data.data;
}

export const useUpdateCategory = () => {
    return useMutation({
        mutationFn: updateCategory,
    });
};
