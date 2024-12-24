import { lazy } from "react"
import { routes } from "./routes"
import { Suspense } from "react"

const Layout = lazy(() => import("@/components/layouts/layout"))
const Home = lazy(() => import("@/pages/home"))

export const guestRoutes = {
  path: routes.home, // Matches "/"
  element: (
    <Suspense fallback={<div>Loading layout...</div>}>
      <Layout />
    </Suspense>
  ),
  children: [
    {
      path: routes.home, // Matches "/"
      element: (
        <Suspense fallback={<div>Loading home...</div>}>
          <Home />
        </Suspense>
      ),
    },
  ],
}