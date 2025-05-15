import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type UpdatePenggunaRequest = {
  id_pengguna: number;
  email?: string;
  nama_pengguna?: string;
  no_telpon?: string;
  id_akun: string;
};

export async function updatePengguna(
  id_pengguna: number | undefined,
  data: UpdatePenggunaRequest
) {
  console.log("Data yang handak dipakai gsn update: ", data);
  const res = await axios.put(`${BaseURL}/pengguna/${id_pengguna}`, data);
  return res.data;
}

export const useUpdatePengguna = (id_pengguna: number | undefined) => {
  return useMutation({
    mutationFn: (data: UpdatePenggunaRequest) =>
      updatePengguna(id_pengguna, data),
  });
};
