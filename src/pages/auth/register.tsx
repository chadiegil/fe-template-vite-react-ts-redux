import { RegisterForm } from "@/features/auth/register-form"
import { useTitle } from "@/hooks/use-title"

export default function Register() {
  useTitle("Register")
  return (
    <div className="flex items-center justify-center">
      <RegisterForm />
    </div>
  )
}
