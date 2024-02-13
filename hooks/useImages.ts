import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useImages = (userId: string) => {
  const url = `/api/images/${userId}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useImages;
