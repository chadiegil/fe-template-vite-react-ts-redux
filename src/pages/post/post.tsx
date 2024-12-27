import { PostPage } from "@/features/post/create/post"
import { PostHeader } from "@/features/post/post-header"
import { useTitle } from "@/hooks/use-title"

export default function Post() {
  useTitle("Test Api")

  return (
    <div className="md:h-[calc(100vh_-_108px)] flex flex-col gap-8">
      <PostHeader />
      <PostPage />
      {/* <TestApisFilter />
        <TestApisAction />
        <TestApisTable /> */}
    </div>
  )
}
