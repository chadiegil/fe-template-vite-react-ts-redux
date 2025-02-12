import { useEffect, useState } from "react"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { getSinglePost, updatePost } from "@/redux/slices/post-slice"
import { PostFormData } from "@/custom-types/post-type"
import { postSchema } from "@/utils/validation/post-schema"
import { ArrowLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { ValidationError } from "yup"
import { useAppSelector } from "@/hooks/use-app-selector"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTitle } from "@/hooks/use-title"

export const EditPostPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { id } = useParams()
  const { singlePost } = useAppSelector((state) => state.post)

  useTitle("Edit Post")

  const [formData, setFormData] = useState<PostFormData>({
    description: "",
    attachment: null,
  })
  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({})
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const appDispatch = useAppDispatch()

  useEffect(() => {
    const fetchSinglePost = async () => {
      if (id !== undefined) {
        await appDispatch(getSinglePost(Number(id)))
      }
    }
    fetchSinglePost()
  }, [])

  useEffect(() => {
    if (singlePost) {
      setFormData({
        id: singlePost.id,
        description: singlePost.description,
        attachment: null,
      })
    }
  }, [singlePost])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({
      ...prev,
      attachment: file,
    }))

    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setPreviewImage(objectUrl)
    } else {
      setPreviewImage(null)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await postSchema.validate(formData, { abortEarly: false })
      await appDispatch(updatePost(formData))
      setFormData({ description: "", attachment: null })
      setValidationErrors({})
      navigate("/")
      toast({
        variant: "success",
        title: "Post updated successfully.",
        description: <div className="text-left">{formData.description}</div>,
      })
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors: Partial<Record<keyof typeof formData, string>> = {}
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof typeof formData] = err.message
          }
        })
        setValidationErrors(errors)
      }
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md space-y-8 w-[50%]">
        <div className="flex justify-start">
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft />
          </Button>
        </div>
        <div className="space-y-2 text-left">
          <h2 className="text-3xl font-bold">Edit Post</h2>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Description Field */}
          <div className="space-y-2 text-left">
            <Label
              htmlFor="description"
              className="text-gray-600 dark:text-gray-400"
            >
              Description
            </Label>
            <Input
              id="description"
              placeholder="Enter a description"
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              value={formData.description}
              onChange={handleInputChange}
              error={validationErrors.description}
            />
          </div>

          {/* Attachment Field */}
          <div className="space-y-2 text-left">
            <Label
              htmlFor="attachment"
              className="text-gray-600 dark:text-gray-400 hover:cursor-pointer"
            >
              Attachment
            </Label>
            <Input
              id="attachment"
              type="file"
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:cursor-pointer"
              onChange={handleFileChange}
              error={validationErrors.attachment}
            />
          </div>
          <div className="flex justify-center align-middle">
            <img
              className="w-[100px] h-[100px]"
              src={
                previewImage ||
                `${import.meta.env.VITE_APP_BASE_URL}/uploads/${
                  singlePost?.attachment
                }`
              }
              alt="img-attachment"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gray-700 text-white dark:bg-gray-700  dark:text-white hover:text-white"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  )
}
