import { LoginForm } from "@/features/auth/login-form"
import { useTitle } from "@/hooks/use-title"

export default function Login() {
  useTitle("Login")
  return (
    <div className="flex items-center justify-center">
      <LoginForm />
    </div>
  )
}
