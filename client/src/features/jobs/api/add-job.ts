import { API_URL } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import type { Job } from "./fetch-jobs";

const addJob = async (prompt: string) => {
  const { data } = await axios.post<Job>(`${API_URL}/jobs`, { prompt });
  return data;
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addJob,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
    // onError: (err: ResponseError) => {
    //   errorToast(err.response?.data?.message || err.message);
    // },
  });
};
