import { Pagination } from "react-bootstrap";

interface PaginationBarProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export default function PaginationBar({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationBarProps) {
  return (
    <Pagination>
      <Pagination.First onClick={() => onPageChange(1)} />
      <Pagination.Prev
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      />
      {Array.from({ length: totalPages }, (_, i) => (
        <Pagination.Item
          key={i + 1}
          active={i + 1 === currentPage}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      />
      <Pagination.Last onClick={() => onPageChange(totalPages)} />
    </Pagination>
  );
}
