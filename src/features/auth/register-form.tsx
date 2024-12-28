import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RegisterFormData } from "@/custom-types/form-data-types"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { register, resetErrorMessage } from "@/redux/slices/auth-slice"
import { registerSchema } from "@/utils/validation/auth-schema"
import { useEffect, useState } from "react"
import { ValidationError } from "yup"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link, useNavigate } from "react-router-dom"
import { LoaderCircle } from "lucide-react"
import { Loading } from "@/custom-types/loading-types"
import { useToast } from "@/hooks/use-toast"

export const RegisterForm = () => {
  const appDispatch = useAppDispatch()
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    appDispatch(resetErrorMessage(null))
  }, [appDispatch])
  const { loading, error } = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "",
    contact_no: "",
    address: "",
  })

  const [validationErrors, setValidationErrors] = useState<
    Partial<RegisterFormData>
  >({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    setValidationErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void handleRegister()
    }
  }

  const handleRoleChange = async (value: string) => {
    setFormData({ ...formData, role: value })
  }

  const handleRegister = async () => {
    try {
      setValidationErrors({})
      await registerSchema.validate(formData, { abortEarly: false })
      const result = await appDispatch(register(formData))
      if (result.type === "auth/register/fulfilled") {
        navigate("/")
        toast({
          variant: "success",
          title: `${result.payload.message}`,
          // description: <div className="text-left">{result.payload}</div>,
        })
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors: Partial<RegisterFormData> = {}
        error.inner.forEach((err) => {
          errors[err.path as keyof RegisterFormData] = err.message
        })
        setValidationErrors(errors)
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 p-6 border border-gray-300 shadow-lg rounded-md w-[35%]">
      <div className="flex justify-center items-center">Register</div>
      <Input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleInputChange}
        error={validationErrors?.email}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleInputChange}
        error={validationErrors?.password}
      />
      <Input
        name="first_name"
        type="text"
        placeholder="First name"
        onChange={handleInputChange}
        error={validationErrors?.first_name}
      />
      <Input
        name="last_name"
        type="text"
        placeholder="Last name"
        onChange={handleInputChange}
        error={validationErrors?.last_name}
      />
      <Input
        name="contact_no"
        type="text"
        placeholder="Contact number"
        onChange={handleInputChange}
        error={validationErrors?.contact_no}
      />
      {/* select role */}
      <Select onValueChange={handleRoleChange}>
        <SelectTrigger className="w-full" error={validationErrors.role}>
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>

      <Input
        name="address"
        type="text"
        placeholder="Address"
        onChange={handleInputChange}
        error={validationErrors?.address}
        onKeyDown={handleKeyDown}
      />
      <p className="text-sm">
        Already have an account? Click{" "}
        <span className="text-blue-500">
          <Link to="/auth/login">here</Link>
        </span>
      </p>
      {error != null && <p className="text-red-500">{error}</p>}
      <Button onClick={handleRegister}>
        {loading === Loading.Rejected ||
        loading === Loading.Fulfilled ||
        loading === Loading.Idle ? (
          "Register"
        ) : (
          <LoaderCircle className="loader-circle" />
        )}
      </Button>
    </div>
  )
}
