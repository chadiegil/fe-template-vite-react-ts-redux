import { useAppSelector } from "@/hooks/use-app-selector"
import { lazy } from "react"
import { Navigate, Outlet, useSearchParams } from "react-router-dom"

import { routes } from "./routes"

const Login = lazy(async () => await import("@/pages/auth/login"))
const Register = lazy(async () => await import("@/pages/auth/register"))
export const authRoutes = {
  element: <AuthRoute />,
  children: [
    {
      path: routes.auth.login,
      element: <Login />,
    },
    {
      path: routes.auth.register,
      element: <Register />,
    },
  ],
}

export default function AuthRoute() {
  const [searchParams] = useSearchParams()

  const callback = searchParams.get("callback")
  const { access_token } = useAppSelector((state) => state.auth)
  return access_token != null ? <Navigate to={callback ?? "/"} /> : <Outlet />
}
