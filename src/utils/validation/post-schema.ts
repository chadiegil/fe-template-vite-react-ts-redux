import { object, string, mixed } from "yup"

export const postSchema = object().shape({
  description: string().required("Description is required"),
  attachment: mixed()
    .required("Attachment is required")
    .test("fileType", "Attachment must be an image or a file", (value) => {
      if (value && value instanceof File) {
        // Optional: You can validate the file type (for example, image or pdf)
        const validTypes = ["image/jpeg", "image/png", "application/pdf"]
        return validTypes.includes(value.type)
      }
      return false
    }),
})
