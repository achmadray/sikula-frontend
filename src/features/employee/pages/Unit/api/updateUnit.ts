import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function updateUnit(unitData: { id_satuan: number, nama_satuan: string }) {
  const res = await axios.put(`${BaseURL}/satuan/${unitData.id_satuan}`, unitData);
  return res.data;
}

export const useUpdateUnit = () => {
  return useMutation({
    mutationFn: updateUnit,
    onError: (error) => {
      console.error("Error updating unit:", error);
    },
    onSuccess: (data) => {
      console.log("Unit successfully updated:", data);
    },
  });
};
