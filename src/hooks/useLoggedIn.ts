import { useGetMe } from "./useGetMe";

export const useLoggedIn = () => {
  const { isLoading, data: user } = useGetMe();
  return { isLoading, isLoggedIn: !!user };
};
