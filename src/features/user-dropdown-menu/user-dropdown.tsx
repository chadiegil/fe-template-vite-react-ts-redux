import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  //   DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  //   DropdownMenuSub,
  //   DropdownMenuSubContent,
  //   DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { logout } from "@/redux/slices/auth-slice"
import { routes } from "@/routes/routes"
import { useNavigate } from "react-router-dom"

export function UserDropdownMenu() {
  const { user } = useAppSelector((state) => state.auth)
  const appDispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await appDispatch(logout())
    console.log("called")
  }
  const handleLogin = () => {
    navigate("/auth/login")
  }
  const navigateToSettingPage = () => {
    navigate(routes.admin.settings)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {user !== null ? user.first_name : "Guest"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user !== null ? (
          <DropdownMenuGroup>
            <>
              <DropdownMenuItem onClick={navigateToSettingPage}>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          </DropdownMenuGroup>
        ) : null}
        <DropdownMenuSeparator />
        {user == null ? (
          <>
            <DropdownMenuItem onClick={handleLogin}>
              Log in
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={handleLogout}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}