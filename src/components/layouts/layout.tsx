import Nav from "@/features/nav/nav"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
export default function Layout() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  )
}
