import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { SVGProps, useCallback, useEffect, useRef, useState } from "react"
import { UserDropdownMenu } from "../user-dropdown-menu/user-dropdown"
import { useIsMobile } from "@/hooks/use-mobile"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { getlazyPosts, getPosts } from "@/redux/slices/post-slice"
import { Post } from "@/custom-types/post-type"
import { X } from "lucide-react"
import { useAppSelector } from "@/hooks/use-app-selector"

export default function Nav() {
  const isMobile = useIsMobile(1080)
  const appDispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const searchListRef = useRef<HTMLUListElement | null>(null)

  const [searchOpen, setSearchOpen] = useState(false)
  const [lazyPostLocal, setLazyPostLocal] = useState<Post[]>([])
  const [currentLazyPage, setCurrentLazyPage] = useState<number>(1)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchPosts = useCallback(
    async (currentPage: number, description = "", name = "") => {
      if (loading) return
      setLoading(true)

      const result = await appDispatch(
        getlazyPosts({ page: currentPage, description, name })
      )
      const newPosts = result.payload.data

      setLazyPostLocal((prev) => {
        const uniquePosts = [
          ...prev,
          ...newPosts.filter(
            (newPost: Post) =>
              !prev.some((prevPost) => prevPost.id === newPost.id)
          ),
        ]
        return uniquePosts
      })

      setCurrentLazyPage(result.payload.pageInfo.currentPage)
      setLoading(false)
    },
    [appDispatch, loading]
  )

  useEffect(() => {
    fetchPosts(currentLazyPage)
  }, [currentLazyPage])

  const handleScroll = () => {
    if (!searchListRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = searchListRef.current
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      setCurrentLazyPage((prevPage) => prevPage + 1)
    }
  }

  const handleSearchItemClick = async (description: string) => {
    await appDispatch(
      getPosts({
        page: 1,
        description: description,
        name: "",
      })
    )
    setSearchOpen(false)
  }

  const clearSearch = async () => {
    setSearchQuery("")
    await fetchPosts(1) // Fetch all posts when clearing the search
  }

  const filteredPosts = lazyPostLocal.filter((post) =>
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) // Filter posts based on search query

  const handleClear = async () => {
    await appDispatch(
      getPosts({
        page: 1,
        description: "",
        name: "",
      })
    )
    setSearchOpen(false)
  }
  return (
    <header className="flex h-12 w-full shrink-0 items-center">
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
              <SheetDescription />
            </SheetHeader>

            <p id="dialog-description" className="sr-only">
              This menu contains navigation links for the site.
            </p>
            <Link to="/" className="mr-6 hidden lg:flex">
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
                className="flex w-full items-center py-2 text-lg font-semibold hover:bg-gray-100 p-2 rounded-md"
              >
                <span className="transition-transform duration-300 hover:translate-x-2 w-full">
                  About
                </span>
              </Link>
              {user !== null ? (
                <Link
                  to="/admin/post/create"
                  className="flex w-full items-center py-2 text-lg font-semibold hover:bg-gray-100 p-2 rounded-md"
                >
                  <span className="transition-transform duration-300 hover:translate-x-2 w-full">
                    Post
                  </span>
                </Link>
              ) : null}
              <Link
                to="#"
                className="flex w-full items-center py-2 text-lg font-semibold hover:bg-gray-100 p-2 rounded-md"
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
        <Button variant="ghost" onClick={() => setSearchOpen(true)}>
          Search
        </Button>

        <Link
          to="/"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          About
        </Link>
        {user !== null ? (
          <Link
            to="/admin/post/create"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            Post
          </Link>
        ) : null}
        <UserDropdownMenu />
      </nav>

      <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
        <SheetContent
          side="top"
          className="p-4 max-w-md mx-auto rounded-md my-4"
        >
          <SheetHeader>
            <SheetTitle>Search</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <div className="relative">
            <Input
              placeholder="Type to search..."
              className="w-full mt-2"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute top-1/2 right-3 transform -translate-y-1/4"
                onClick={clearSearch}
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            )}
          </div>
          <ul
            ref={searchListRef}
            onScroll={handleScroll}
            className="mt-4 space-y-2 max-h-60 overflow-y-auto"
          >
            {filteredPosts?.map((post) => (
              <li
                key={post.id}
                className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSearchItemClick(post.description)}
              >
                {post.description.length > 25
                  ? `${post.description.slice(0, 35)} ...`
                  : post.description}
              </li>
            ))}
            {loading && <li className="p-2 text-center">Loading...</li>}
          </ul>
          <Button
            className="flex w-full items-center py-2 text-lg font-semibold p-2 rounded-md mt-2"
            onClick={handleClear}
          >
            <span className="transition-transform duration-300 hover:translate-x-2 w-full pointer-events-none">
              Clear Search
            </span>
          </Button>
        </SheetContent>
      </Sheet>
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
