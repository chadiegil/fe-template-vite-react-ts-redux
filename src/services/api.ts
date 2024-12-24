import { axiosPublic } from "@/utils/axios-public"
// import { axiosInstance } from "@utils/axios-instance"

export const refreshUserToken = async () =>
  await axiosPublic.get("/auth/refres")
