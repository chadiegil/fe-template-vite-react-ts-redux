import { PostCard } from "@/features/post/post-card"
import { useTitle } from "@/hooks/use-title"

export default function Home() {
  useTitle("Home")

  return (
    <div className="flex flex-col gap-3">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  )
}
