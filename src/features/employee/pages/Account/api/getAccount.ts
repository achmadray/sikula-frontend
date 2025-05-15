import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getAccount(account_id?: number ) {
    const res = await axios.get(`${BaseURL}/akun/${account_id}`);
    return res.data;
}

export const useGetAccount = (account_id?:number) => {
    return useQuery({ queryKey: ['account'], queryFn : () => getAccount(account_id) });
}

export async function getAllAccount(){
    const res = await axios.get(`${BaseURL}/akun`);
    return  res.data;
}

export const useGetAllAccount = () =>{
    return useQuery({queryKey :['account'], queryFn : () => getAllAccount () });
}