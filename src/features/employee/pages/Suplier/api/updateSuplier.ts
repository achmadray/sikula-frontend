import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { SuplierType } from "../types";

const BaseURL = import.meta.env.VITE_API_URL;

export async function updateSuplier(data: SuplierType) {
  const res = await axios.put(`${BaseURL}/suplier/${data.id_suplier}`, data);
  return res.data.data;
}

export const useUpdateSuplier = () => {
  return useMutation({
    mutationFn: updateSuplier,
  });
};
