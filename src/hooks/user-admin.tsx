import { useAppSelector } from "./use-app-selector"

export const useAdmin = () => {
  const { user } = useAppSelector((state) => state.auth)
  return user?.role?.includes("admin") ?? false
}
