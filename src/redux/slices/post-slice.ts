import { ApiError } from "@/custom-types/api-error-type"
import { Loading } from "@/custom-types/loading-types"
import { Post, PostFilters, PostFormData } from "@/custom-types/post-type"
import { axiosInstance } from "@/utils/axios-instance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

export const createPost = createAsyncThunk(
  "post/createPost",
  async (data: PostFormData, thunkApi) => {
    try {
      const response = await axiosInstance.post("/private/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      const response = axiosError.response?.data as ApiError
      return thunkApi.rejectWithValue(response.message)
    }
  }
)

export const getPosts = createAsyncThunk(
  "post/getPost",
  async (params: PostFilters, thunkApi) => {
    try {
      const response = await axiosInstance.get("/post", { params })
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      const response = axiosError.response?.data as ApiError
      return thunkApi.rejectWithValue(response.message)
    }
  }
)

export const getSinglePost = createAsyncThunk(
  "post/getSinglePost",
  async (id: number, thunkApi) => {
    try {
      const response = await axiosInstance.get(`/post/${id}`)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      const response = axiosError.response?.data as ApiError
      return thunkApi.rejectWithValue(response.message)
    }
  }
)

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (data: PostFormData, thunkApi) => {
    try {
      const response = await axiosInstance.put(`post/update/${data.id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      const response = axiosError.response?.data as ApiError
      return thunkApi.rejectWithValue(response.message)
    }
  }
)

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id: number, thunkApi) => {
    try {
      const response = await axiosInstance.delete(`post/delete/${id}`)
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
  post: Post | null
  singlePost: Post | null
  hasPreviousPage: boolean
  hasNextPage: boolean
  currentPage: number
  totalPages: number
  totalItems: number
}

const initialState: InitialState = {
  loading: Loading.Idle,
  error: null,
  post: null,
  singlePost: null,
  hasPreviousPage: false,
  hasNextPage: false,
  currentPage: 1,
  totalItems: 0,
  totalPages: 0,
}

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    /**
     * Create post
     */
    builder.addCase(createPost.pending, (state) => {
      state.loading = Loading.Pending
      state.error = null
    })
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = Loading.Fulfilled
      state.error = null
      state.post = action.payload.data
    })
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = Loading.Rejected
      state.error = action.payload as string
    })
    /**
     * Get posts
     */
    builder.addCase(getPosts.pending, (state) => {
      state.loading = Loading.Pending
      state.error = null
    })
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = Loading.Fulfilled
      state.error = null
      state.post = action.payload.data
      state.hasNextPage = action.payload.pageInfo.hasNextPage
      state.hasPreviousPage = action.payload.pageInfo.hasPreviousPage
      state.totalItems = action.payload.pageInfo.totalItems
      state.totalPages = action.payload.pageInfo.totalPages
    })
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = Loading.Rejected
      state.error = action.payload as string
    })
    /**
     * Get single post
     */
    builder.addCase(getSinglePost.pending, (state) => {
      state.loading = Loading.Pending
      state.error = null
    })
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.loading = Loading.Fulfilled
      state.error = null
      state.singlePost = action.payload
    })
    builder.addCase(getSinglePost.rejected, (state, action) => {
      state.loading = Loading.Rejected
      state.error = action.payload as string
    })
  },
})

// export const { setApiKey, setSelectedApi, setTestApis } = PostSlice.actions
export default PostSlice.reducer
