import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  onPageChange: (page: number) => void
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasNextPage,
  onPageChange,
}) => {
  const getPageRange = () => {
    let start = currentPage - 1
    let end = currentPage + 1

    if (currentPage === 1) {
      start = 1
      end = 3
    } else if (currentPage === totalPages) {
      start = totalPages - 2
      end = totalPages
    }

    if (totalPages <= 3) {
      start = 1
      end = totalPages
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) {
                onPageChange(currentPage - 1)
              }
            }}
            className={currentPage <= 1 ? "cursor-not-allowed opacity-50" : ""}
          />
        </PaginationItem>

        {getPageRange().map((page) => (
          <PaginationLink
            key={page}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onPageChange(page)
            }}
            isActive={currentPage === page}
          >
            {page}
          </PaginationLink>
        ))}

        {totalPages > 3 && currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis
              className="hover:cursor-pointer"
              onClick={() => {
                const nextPage = Math.min(currentPage + 5, totalPages)
                onPageChange(nextPage)
              }}
            />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (hasNextPage) {
                onPageChange(currentPage + 1)
              }
            }}
            className={!hasNextPage ? "cursor-not-allowed opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComponent
