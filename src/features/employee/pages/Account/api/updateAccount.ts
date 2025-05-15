import axios from "axios";
import { AccountType } from "../types";
import { useMutation } from "@tanstack/react-query";

const BaseURL = import.meta.env.VITE_API_URL;

export async function updateAccount(data:  AccountType ) {
    const res = await axios.put(`${BaseURL}/akun/${data.id_akun}`, data);
    return res.data.data;
}

export const useUpdateAccount = () =>{
    return useMutation({
        mutationFn: updateAccount,
    });
};