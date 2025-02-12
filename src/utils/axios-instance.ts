import axios, { type AxiosInstance } from "axios"
import { type Store } from "@reduxjs/toolkit"
import { type RootState } from "@/redux/store"
import { refreshUserToken } from "@/services/api"
import { setAccessToken } from "@/redux/slices/auth-slice"

export let axiosInstance: AxiosInstance

export const setupAxiosInstance = (store: Store<RootState>) => {
  axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  })

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.access_token
      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    async (error) => await Promise.reject(error)
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const previousRequest = error.config
      if (
        error.response.status === 403 &&
        error.response.data.message !== "PermissionError"
      ) {
        try {
          const tokenResponse = await refreshUserToken()
          store.dispatch(setAccessToken(tokenResponse.data.access_token))
          return await axiosInstance(previousRequest)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          store.dispatch(setAccessToken(null))
        }
      }
      return await Promise.reject(error)
    }
  )
}
