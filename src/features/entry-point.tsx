import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { refreshToken } from "@/redux/slices/auth-slice"
import { guestRoutes } from "@/routes/guest-route"
import { authRoutes } from "@/routes/auth-route"
import { Suspense, useEffect, useState } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  guestRoutes,
  authRoutes,
  //   privateRoutes,
  //   otherRoutes,
])

export const EntryPoint = () => {
  const appDispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await appDispatch(refreshToken())
      setLoading(false)
    }
    void verifyRefreshToken()
  }, [])

  return loading ? (
    <>Loading...</>
  ) : (
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
