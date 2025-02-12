export interface Post {
  id?: number
  userId: number
  description: string
  attachment: string | null
  created_at: Date
}

export interface PostFormData {
  id?: number
  description: string
  attachment: File | null | string
}

export interface PostFilters {
  page?: number
  description: string
  name: string
}

export interface UploadedImage {
  attachment: string
}
