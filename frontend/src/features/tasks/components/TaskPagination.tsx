import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type TaskPaginationProps = {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

export default function TaskPagination({
  page,
  totalPage,
  onPageChange,
}: TaskPaginationProps) {
  return (
    <Pagination className="mx-0 w-auto">
      <PaginationContent>
        <PaginationItem
          className="cursor-pointer"
          onClick={() => page > 1 && onPageChange(page - 1)}
        >
          <PaginationPrevious aria-disabled={page === 1} />
        </PaginationItem>

        {Array.from({ length: totalPage }, (_, i: number) => {
          return (
            <PaginationItem
              key={i}
              className="cursor-pointer"
              onClick={() => onPageChange(i + 1)}
            >
              <PaginationLink isActive={page === i + 1}>{i + 1}</PaginationLink>
            </PaginationItem>
          );
        })}

        {totalPage > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem
          className="cursor-pointer"
          onClick={() => page < totalPage && onPageChange(page + 1)}
        >
          <PaginationNext aria-disabled={page === totalPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
