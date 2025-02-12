import { lazy } from "react"
import { routes } from "./routes"
import { useAdmin } from "@/hooks/user-admin"
import { Navigate, Outlet } from "react-router-dom"

const Setting = lazy(async () => await import("@/pages/settings/setting"))
const Post = lazy(async () => await import("@/pages/post/create/post"))
const EditPost = lazy(async () => await import("@/pages/post/edit/edit-post"))
export const adminRoutes = {
  element: <AdminRoute />,
  children: [
    {
      path: routes.admin.settings,
      element: <Setting />,
    },
    {
      path: routes.admin.post,
      element: <Post />,
    },
    {
      path: routes.admin.editPost,
      element: <EditPost />,
    },
  ],
}
export default function AdminRoute() {
  const isAdmin = useAdmin()
  return isAdmin ? <Outlet /> : <Navigate to="/auth/login" />
}
