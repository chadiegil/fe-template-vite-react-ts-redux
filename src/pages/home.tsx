import PaginationComponent from "@/components/shared/pagination"
import { PostCard } from "@/features/post/post-card"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { useTitle } from "@/hooks/use-title"
import { getPosts } from "@/redux/slices/post-slice"
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export default function Home() {
  useTitle("Home")

  const { post, hasNextPage, currentPage, totalPages } = useAppSelector(
    (state) => state.post
  )

  const appDispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    appDispatch({ type: "post/setPage", payload: 1 })
    const searchParams = new URLSearchParams(location.search)
    searchParams.set("page", "1")
    navigate({ search: searchParams.toString() })
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      await appDispatch(
        getPosts({
          page: currentPage,
          description: "",
          name: "",
        })
      )
    }
    fetchPosts()
  }, [appDispatch, currentPage])

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      appDispatch({ type: "post/setPage", payload: page })

      const searchParams = new URLSearchParams(location.search)
      searchParams.set("page", page.toString())
      navigate({ search: searchParams.toString() })
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {Array.isArray(post) &&
        post.map((postItem) => (
          <PostCard
            key={postItem.id}
            id={postItem.id}
            userId={postItem.userId}
            created_at={postItem.created_at}
            description={postItem.description}
            attachment={postItem.attachment}
          />
        ))}

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
