import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { SVGProps } from "react"
import { UserDropdownMenu } from "../user-dropdown-menu/user-dropdown"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Nav() {
  const isMobile = useIsMobile(1080)
  return (
    <header className="flex h-20 w-full shrink-0 items-center">
      <div className={isMobile ? "flex w-full justify-between" : ""}>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="flex justify-center text-lg font-semibold bg-gray-100 rounded-md p-1 mt-4">
                Navigation Menu
              </SheetTitle>
              <SheetDescription>
                {/* Make changes to your profile here. Click save when you're done. */}
              </SheetDescription>
            </SheetHeader>

            <p id="dialog-description" className="sr-only">
              This menu contains navigation links for the site.
            </p>
            <Link to="/" className="mr-6 hidden lg:flex">
              <MountainIcon className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <div className="grid gap-2 py-6">
              <Link
                to="/"
                className="flex w-full items-center py-2 text-lg font-semibold hover:bg-gray-100 p-2 rounded-md"
              >
                <span className="transition-transform duration-300 hover:translate-x-2 w-full">
                  Home
                </span>
              </Link>
              <Link
                to="/about"
                className="flex w-full items-center py-2 text-lg font-semibold  hover:bg-gray-100 p-2 rounded-md"
              >
                <span className="transition-transform duration-300 hover:translate-x-2 w-full">
                  About
                </span>
              </Link>
              <Link
                to="/admin/post/create"
                className="flex w-full items-center py-2 text-lg font-semibold  hover:bg-gray-100 p-2 rounded-md"
              >
                <span className="transition-transform duration-300 hover:translate-x-2 w-full">
                  Post
                </span>
              </Link>
              <Link
                to="#"
                className="flex w-full items-center py-2 text-lg font-semibold  hover:bg-gray-100 p-2 rounded-md"
              >
                <span className="transition-transform duration-300 hover:translate-x-2 w-full">
                  Contact
                </span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        {isMobile && <UserDropdownMenu />}
      </div>

      <Link to="/" className="mr-6 hidden lg:flex">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        <Link
          to="/"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
        >
          About
        </Link>
        <Link
          to="/admin/post/create"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
        >
          Post
        </Link>
        <UserDropdownMenu />
      </nav>
    </header>
  )
}

function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function MountainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
