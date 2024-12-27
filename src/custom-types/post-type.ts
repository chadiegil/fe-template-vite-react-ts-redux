export interface Post {
  id?: number
  description: string
  attachment: string | null
}

export interface PostFormData {
  description: string
  attachment: File | null
}

export interface PostFilters {
  description: string
  name: string
}
