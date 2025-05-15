import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function addUnit(unitData: { nama_satuan: string }) {
  const res = await axios.post(`${BaseURL}/satuan`, unitData);
  return res.data;
}

export const useAddUnit = () => {
  return useMutation({
    mutationFn: addUnit,
    onError: (error) => {
      console.error("Error adding unit:", error);
    },
    onSuccess: (data) => {
      console.log("Unit successfully added:", data);
    },
  });
};
