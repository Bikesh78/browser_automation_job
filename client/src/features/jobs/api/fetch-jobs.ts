import { API_URL } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Job = {
  id: string;
  prompt: string;
  status: 'Pending' | 'Processing' | 'Complete';
  result: 'Success' | 'Fail' | null;
  output: string | null;
};

const fetchJobs = async () => {
  const { data } = await axios.get<Job[]>(`${API_URL}/jobs`);
  console.log('data', data)
  return data
};


export const useFetchJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    refetchInterval: 3000,
  });
};
