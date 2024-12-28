import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { formatDistanceToNow } from "date-fns"
import { Post } from "@/custom-types/post-type"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useToast } from "@/hooks/use-toast"
import { deletePost, getPosts } from "@/redux/slices/post-slice"
import { NotebookPen, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAppSelector } from "@/hooks/use-app-selector"

interface Props {
  createdAt: string | Date
}

const TimeAgo: React.FC<Props> = ({ createdAt }) => {
  return (
    <span className="ml-2">
      ( {formatDistanceToNow(new Date(createdAt), { addSuffix: true })})
    </span>
  )
}

export default TimeAgo

export function PostCard(data: Post) {
  const navigate = useNavigate()
  const appDispatch = useAppDispatch()
  const { toast } = useToast()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
  const { user } = useAppSelector((state) => state.auth)
  const postOwner = user?.id === data.userId

  const handleDelete = async (id: number | undefined) => {
    if (id) {
      const result = await appDispatch(deletePost(id))
      if (result.type === "post/deletePost/fulfilled") {
        toast({
          variant: "success",
          title: "Post deleted successfully.",
        })

        await appDispatch(
          getPosts({
            description: "",
            name: "",
          })
        )
      }
      if (result.type === "post/deletePost/rejected") {
        toast({
          variant: "destructive",
          title: `${result.payload}`,
        })
      }
    }
    setIsDeleteDialogOpen(false)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>
          <div className="text-left flex justify-between">
            <div>
              <span className="font-bold">Description</span>: {data.description}
              <div className="my-2">
                <span className="font-bold">Posted</span>:{" "}
                {new Date(data.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                <TimeAgo createdAt={data.created_at} />
              </div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Image with Zoom Dialog */}
        <div className="flex justify-center">
          <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
            <DialogTrigger asChild>
              <img
                className="w-[300px] h-[200px] cursor-pointer"
                src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${
                  data.attachment
                }`}
                alt="img-upload"
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90%] p-0">
              <DialogHeader>
                <DialogTitle className="p-5">{data.attachment}</DialogTitle>
                <DialogDescription className="pl-5">
                  {data.description}
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center items-center p-5">
                <img
                  className="max-w-full max-h-[80vh]"
                  src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${
                    data.attachment
                  }`}
                  alt="img-preview"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {postOwner ? (
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/post/edit/${data.id}`)}
          >
            <NotebookPen className="text-blue-500" />
          </Button>
        ) : null}

        {/* Dialog for confirming deletion */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            {postOwner ? (
              <Button variant="outline">
                <Trash2 className="text-red-500" />
              </Button>
            ) : null}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this post? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => void handleDelete(data.id)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
