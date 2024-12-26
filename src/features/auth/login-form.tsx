import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoginFormData } from "@/custom-types/form-data-types"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { login } from "@/redux/slices/auth-slice"
import { loginSchema } from "@/utils/validation/auth-schema"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ValidationError } from "yup"

export const LoginForm = () => {
  const appDispatch = useAppDispatch()

  const { error } = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [validationErrors, setValidationErrors] = useState<
    Partial<LoginFormData>
  >({})
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void handleSubmit()
    }
  }

  const handleSubmit = async () => {
    try {
      await loginSchema.validate(formData, { abortEarly: false })
      await appDispatch(login(formData))
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors: Partial<LoginFormData> = {}
        error.inner.forEach((err) => {
          errors[err.path as keyof LoginFormData] = err.message
        })
        setValidationErrors(errors)
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 p-6 border border-gray-300 shadow-lg rounded-md w-[25%] mt-10">
      <div className="flex justify-center items-center text-lg font-semibold mb-10">
        Login
      </div>
      <Input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleInputChange}
        error={validationErrors.email}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        error={validationErrors.password}
      />
      <p>
        Dont have an account yet? Click{" "}
        <span className="text-blue-500">
          <Link to="/auth/register">here</Link>
        </span>
      </p>
      {error != null && <p className="text-red-500">{error}</p>}
      <Button onClick={handleSubmit}>Login</Button>
    </div>
  )
}