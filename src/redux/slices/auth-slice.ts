import { ApiError } from "@/custom-types/api-error-type"
import { LoginFormData, RegisterFormData } from "@/custom-types/form-data-types"
import { Loading } from "@/custom-types/loading-types"
import { User } from "@/custom-types/user-type"
import { refreshUserToken } from "@/services/api"
import { axiosInstance } from "@/utils/axios-instance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginFormData, thunkApi) => {
    try {
      const response = await axiosInstance.post("/auth/login", data)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      const response = axiosError.response?.data as ApiError
      return thunkApi.rejectWithValue(response.message)
    }
  }
)

export const register = createAsyncThunk(
  "auth/register",
  async (data: RegisterFormData, thunkApi) => {
    try {
      const response = await axiosInstance.post("/auth/register", data)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      const response = axiosError.response?.data as ApiError
      return thunkApi.rejectWithValue(response.message)
    }
  }
)

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkApi) => {
    try {
      const response = await refreshUserToken()
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      const response = axiosError.response?.data as ApiError
      return thunkApi.rejectWithValue(response.message)
    }
  }
)

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    const response = await axiosInstance.post("/auth/logout")
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    const response = axiosError.response?.data as ApiError
    return thunkApi.rejectWithValue(response.message)
  }
})

interface InitialState {
  loading: Loading.Idle | Loading.Pending | Loading.Fulfilled | Loading.Rejected
  error: string | null
  access_token: string | null
  user: User | null
  message: string | null
}

const initialState: InitialState = {
  loading: Loading.Idle,
  error: null,
  access_token: null,
  user: null,
  message: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload
    },
    resetErrorMessage: (state, action) => {
      state.error = action.payload
    },
  },
  extraReducers(builder) {
    /**
     * Login
     */
    builder.addCase(login.pending, (state) => {
      state.loading = Loading.Pending
      state.error = null
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = Loading.Fulfilled
      state.error = null
      state.access_token = action.payload.access_token
      state.user = action.payload.user
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = Loading.Rejected
      state.error = action.payload as string
    })
    /**
     * Register
     */
    builder.addCase(register.pending, (state) => {
      state.loading = Loading.Pending
      state.error = null
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = Loading.Fulfilled
      state.error = null
      state.access_token = action.payload.access_token
      state.user = action.payload.user
    })
    builder.addCase(register.rejected, (state, action) => {
      state.loading = Loading.Rejected
      state.error = action.payload as string
    })
    /**
     * Refresh token
     */
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = Loading.Pending
      state.error = null
      state.access_token = null
      state.user = null
    })
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.loading = Loading.Fulfilled
      state.error = null
      state.access_token = action.payload.access_token
      state.user = action.payload.user
      state.user = action.payload.message
    })
    builder.addCase(refreshToken.rejected, (state) => {
      state.loading = Loading.Rejected
    })
    /**
     * Logout
     */
    builder.addCase(logout.pending, (state) => {
      state.loading = Loading.Pending
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = Loading.Fulfilled
      state.error = null
      state.access_token = null
      state.user = null
    })
    builder.addCase(logout.rejected, (state) => {
      state.loading = Loading.Rejected
    })
  },
})

export const { setAccessToken, resetErrorMessage } = authSlice.actions
export default authSlice.reducer
