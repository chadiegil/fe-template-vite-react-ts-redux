import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import * as yup from "yup"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { createPost } from "@/redux/slices/post-slice"
import { PostFormData } from "@/custom-types/post-type"
import { postSchema } from "@/utils/validation/post-schema"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
// import { ToastAction } from "@/components/ui/toast"

export const PostPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [formData, setFormData] = useState<PostFormData>({
    description: "",
    attachment: null,
  })
  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({})
  const appDispatch = useAppDispatch()

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
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await postSchema.validate(formData, { abortEarly: false })

      console.log(formData)

      await appDispatch(createPost(formData))
      // toast({
      //   title: "Post created successfully.",
      //   description: formData.description,
      // })
      setFormData({ description: "", attachment: null })
      setValidationErrors({})
      navigate("/")
      toast({
        variant: "success",
        title: "Post created successfully.",
        description: <div className="text-left">{formData.description}</div>,
      })
    } catch (error) {
      if (error instanceof yup.ValidationError) {
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
          <h2 className="text-3xl font-bold">Create Post</h2>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2 text-left">
            <Label
              htmlFor="description"
              className="text-gray-600 dark:text-gray-400"
            >
              Description
            </Label>
            <Input
              id="description"
              placeholder="Enter description"
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
              className="text-gray-600 dark:text-gray-400"
            >
              Attachment
            </Label>
            <Input
              id="attachment"
              type="file"
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              onChange={handleFileChange}
              error={validationErrors.attachment}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  )
}
