import { PostCard } from "@/features/post/post-card"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useAppSelector } from "@/hooks/use-app-selector"
import { useTitle } from "@/hooks/use-title"
import { getPosts } from "@/redux/slices/post-slice"
import { useEffect } from "react"

export default function Home() {
  useTitle("Home")

  const { post } = useAppSelector((state) => state.post)
  const appDispatch = useAppDispatch()

  useEffect(() => {
    const fetchPost = async () => {
      await appDispatch(
        getPosts({
          description: "",
          name: "",
        })
      )
    }
    fetchPost()
  }, [])
  return (
    <div className="flex flex-col gap-3">
      {Array.isArray(post) &&
        post.map((postItem) => (
          <PostCard
            key={postItem.id}
            id={postItem.id}
            userId={postItem.userId}
            description={postItem.description}
            attachment={postItem.attachment}
          />
        ))}
    </div>
  )
}
