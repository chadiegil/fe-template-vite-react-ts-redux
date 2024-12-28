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

import { Post } from "@/custom-types/post-type"
import { useAppDispatch } from "@/hooks/use-app-dispatch"
import { useToast } from "@/hooks/use-toast"
import { deletePost, getPosts } from "@/redux/slices/post-slice"
import { NotebookPen, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function PostCard(data: Post) {
  const navigate = useNavigate()
  const appDispatch = useAppDispatch()
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
          title: result.payload,
        })
      }
    }
    setIsDialogOpen(false)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>
          <div>ID: {data.id}</div>
          <div>Description: {data.description}</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>Attachment: {data.attachment}</div>
        <div className="w-full flex justify-center">
          <img
            className="w-[300px] h-[200px]"
            src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${
              data.attachment
            }`}
            alt="img-upload"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/post/edit/${data.id}`)}
        >
          <NotebookPen className="text-blue-500" />
        </Button>

        {/* Dialog for confirming deletion */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Trash2 className="text-red-500" />
            </Button>
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
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
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
