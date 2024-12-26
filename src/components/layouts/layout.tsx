import Nav from "@/features/nav/nav"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  )
}
