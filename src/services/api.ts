import { axiosPublic } from "@/utils/axios-public"

export const refreshUserToken = async () => {
  const token = localStorage.getItem("authToken")
  if (!token) {
    return null
  }

  const response = await axiosPublic.get("/auth/refresh")
  return response.data
}
