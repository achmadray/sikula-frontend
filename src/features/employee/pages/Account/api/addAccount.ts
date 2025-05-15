import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type accountPost = {
    username: string,
    level: string,
    password: string,
};

export const postAddAccount = async (accountPost: accountPost) =>{
    console.log('Data yang dikirim : ',accountPost);
    const response = await axios.post(`${BaseURL}/akun`, accountPost);
    return response.data;
};

export const useAddAccount = () =>{
    return useMutation({
        mutationFn: postAddAccount,
        onMutate: async (accountPost: accountPost) =>{
            console.log(accountPost);
        },
        onError:(error) =>{
            console.log('error :', error);
        },
    });
};
