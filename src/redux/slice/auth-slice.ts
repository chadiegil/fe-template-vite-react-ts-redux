import { ApiError } from "@/custom-types/api-error-type"
import { Loading } from "@/custom-types/loading-types"
import { User } from "@/custom-types/user-type"
import { refreshUserToken } from "@/services/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

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

interface InitialState {
  loading: Loading.Idle | Loading.Pending | Loading.Fulfilled | Loading.Rejected
  error: string | null
  access_token: string | null
  user: User | null
}

const initialState: InitialState = {
  loading: Loading.Idle,
  error: null,
  access_token: null,
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload
    },
  },
  // extraReducers(builder){

  // }
})

export const { setAccessToken } = authSlice.actions
export default authSlice.reducer
