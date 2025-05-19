import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getDetail(detail_id?: number) {
  if (!detail_id) return null;
  const res = await axios.get(`${BaseURL}/detail_transaksi/${detail_id}`);
  return res.data;
}

export const useGetDetail = (detail_id?: number) => {
  return useQuery({
    queryKey: ["detail", detail_id],
    queryFn: () => getDetail(detail_id),
    enabled: !!detail_id,
  });
};

export async function getAllDetail() {
  const res = await axios.get(`${BaseURL}/detail_transaksi`);
  return res.data;
}

export const useGetAllDetail = () => {
  return useQuery({ queryKey: ["detail_transaksi"], queryFn: () => getAllDetail() });
};
