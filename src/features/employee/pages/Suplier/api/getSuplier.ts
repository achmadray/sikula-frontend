import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getSuplier(suplier_id?: number ) {
    const res = await axios.get(`${BaseURL}/suplier/${suplier_id}`);
    return res.data;
}

export const useGetSuplier = (suplier_id?:number) => {
    return useQuery({ queryKey: ['suplier'], queryFn : () => getSuplier(suplier_id) });
}

export async function getAllSuplier(){
    const res = await axios.get(`${BaseURL}/suplier`);
    return  res.data;
}

export const useGetAllSuplier = () =>{
    return useQuery({queryKey :['suplier'], queryFn : () => getAllSuplier () });
}