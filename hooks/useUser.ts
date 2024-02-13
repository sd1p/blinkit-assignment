import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
  let { data, error, isLoading, mutate } = useSWR("/api/auth/current", fetcher);
  data = data?.currentUser;
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
