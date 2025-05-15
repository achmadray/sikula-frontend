import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { MenuType } from "../types";

const BaseURL = import.meta.env.VITE_API_URL;

export const postAddMenu = async (menuData: MenuType) => {
  console.log("Data yang dikirim:", menuData);
  const response = await axios.post(`${BaseURL}/menu`, menuData);
  return response.data;
};

export const useAddMenu = () => {
  return useMutation({
    mutationFn: postAddMenu,
    onMutate: async (menuData: MenuType) => {
      console.log("Mutating data:", menuData);
    },
    onError: (error) => {
      console.log("Error:", error);
    },
    onSuccess: (data) => {
      console.log("Menu successfully added:", data);
    },
  });
};
