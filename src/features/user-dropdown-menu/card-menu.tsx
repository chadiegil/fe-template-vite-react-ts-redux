import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  //   DropdownMenuPortal,
  DropdownMenuShortcut,
  //   DropdownMenuSub,
  //   DropdownMenuSubContent,
  //   DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { routes } from "@/routes/routes"
import { EllipsisVertical } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

export function CardMenu() {
  const navigate = useNavigate()
  const { id } = useParams()
  const handleEdit = (id: number | undefined) => {
    navigate(routes.admin.editPost)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel></DropdownMenuLabel>
        <DropdownMenuGroup>
          <>
            <DropdownMenuItem
              onClick={handleEdit(id)}
              className="hover:cursor-pointer"
            >
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
          <>
            <DropdownMenuItem
              onClick={handleEdit}
              className="hover:cursor-pointer"
            >
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
