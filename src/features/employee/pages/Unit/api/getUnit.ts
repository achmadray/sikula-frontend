import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export type UnitType = {
  id_satuan: number;
  nama_satuan: string;
};

export async function getUnit(unit_id?: number) {
  const res = await axios.get(`${BaseURL}/satuan/${unit_id}`);
  return res.data as UnitType;
}

export const useGetUnit = (unit_id?: number) => {
  return useQuery({
    queryKey: ["unit", unit_id],
    queryFn: () => getUnit(unit_id),
  });
};

export async function getAllUnit() {
  const res = await axios.get(`${BaseURL}/satuan`);
  return res.data as UnitType[];
}

export const useGetAllUnit = () => {
  return useQuery({
    queryKey: ["unit"],
    queryFn: () => getAllUnit(),
  });
};
