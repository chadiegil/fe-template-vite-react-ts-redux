export interface Post {
  id?: number
  description: string
  attachment: string | null
}

export interface PostFormData {
  id?: number
  description: string
  attachment: File | null | string
}

export interface PostFilters {
  description: string
  name: string
}

export interface UploadedImage {
  attachment: string
}
