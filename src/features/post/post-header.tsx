import { PageTitle } from "@/components/shared/page-title"

export const PostHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <PageTitle>Post</PageTitle>
    </div>
  )
}
