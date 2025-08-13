  import { useState, useEffect } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "../../../common/ui/pagination";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationComponent({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange 
}: PaginationComponentProps) {
  const [activePage, setActivePage] = useState(currentPage);

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

  const handlePageClick = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePage(page);
    onPageChange(page);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 4;
    
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than or equal to max pages to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate middle pages
      let startPage = Math.max(2, activePage - 1);
      let endPage = Math.min(totalPages - 1, activePage + 1);
      
      // Adjust if we're at the beginning or end
      if (activePage <= 2) {
        endPage = Math.min(totalPages - 1, maxPagesToShow - 1);
      } else if (activePage >= totalPages - 1) {
        startPage = Math.max(2, totalPages - maxPagesToShow + 1);
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Always include last page if it's not already included
      if (!pageNumbers.includes(totalPages)) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (activePage > 1) {
                const newPage = activePage - 1;
                setActivePage(newPage);
                onPageChange(newPage);
              }
            }}
          />
        </PaginationItem>
        <div className="bg-white flex items-center gap-2 rounded-full mx-3">
          {getPageNumbers().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === activePage}
                onClick={handlePageClick(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (activePage < totalPages) {
                const newPage = activePage + 1;
                setActivePage(newPage);
                onPageChange(newPage);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
