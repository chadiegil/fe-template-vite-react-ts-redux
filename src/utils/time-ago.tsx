import { formatDistanceToNow } from "date-fns"

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
