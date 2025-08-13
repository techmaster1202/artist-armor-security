// ReviewsTable.tsx
import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Filter, RefreshCw } from "lucide-react";
import { Button } from "../../../common/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../common/ui/dropdown-menu";
import { Review } from "../../../common/data/data";
import { ReviewCard } from "./ReviewCard";
import { ReviewList } from "./ReviewList";

interface ReviewsTableProps {
  data: Review[];
}

const ReviewsTable: React.FC<ReviewsTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagMenuOpen, setTagMenuOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const tags = [
    {
      label: "BAD SERVICE",
      value: "BAD SERVICE",
      color: "bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-800",
    },
    {
      label: "UNEXPECTED",
      value: "UNEXPECTED",
      color:
        "bg-purple-100 text-purple-800 hover:bg-purple-200 hover:text-purple-800",
    },
    {
      label: "GREAT",
      value: "GREAT",
      color: "bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-800",
    },
    {
      label: "EXCELLENT",
      value: "EXCELLENT",
      color:
        "bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800",
    },
    {
      label: "BEST SERVICE",
      value: "BEST SERVICE",
      color:
        "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-800",
    },
  ];

  const handleRefresh = () => {
    setSorting([]);
    setColumnFilters([]);
    setSelectedTags([]);
    setSortDirection("asc");
    setTagMenuOpen(false);
  };

  const handleTagToggle = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);

    setColumnFilters((prev) => {
      const tagFilterExists = prev.some((f) => f.id === "tags");
      if (!tagFilterExists)
        return [...prev, { id: "tags", value: newSelectedTags }];
      return prev.map((f) =>
        f.id === "tags" ? { ...f, value: newSelectedTags } : f
      );
    });
  };

  const handleSortToggle = (sortType: string) => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);

    let sortId = "";
    if (sortType === "rating") sortId = "rating";
    else if (sortType === "abc") sortId = "customerName";
    else if (sortType === "123") sortId = "id";
    else if (sortType === "tags") sortId = "tags";  

    if (sortId) {
      setSorting([{ id: sortId, desc: newDirection === "desc" }]);
    }
  };

  const columns: ColumnDef<Review>[] = [
    {
      id: "reviewCard",
      cell: ({ row }) => <ReviewCard review={row.original} />,
    },
    { id: "rating", accessorFn: (row) => row.rating },
    { id: "customerName", accessorFn: (row) => row.customerName },
    { id: "id", accessorFn: (row) => row.id },
    {
      id: "tags",
      accessorFn: (row) => row.tags,
      filterFn: (row, id, filterValue) => {
        if (!filterValue || filterValue.length === 0) return true;
        const tags = row.getValue(id) as string[];
        return tags.some((tag) => filterValue.includes(tag));
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <div className="relative">
      <div className="absolute -top-20 right-2 flex items-center gap-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hover:bg-blue-700">
            <Button
              variant="default"
              size="sm"
              className="h-10 w-28 gap-2 rounded-xl"
            >
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="left"
            align="center"
            className="bg-gray-200 rounded-xl px-2 py-1 shadow-md flex gap-3"
          >
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                handleSortToggle("rating");
              }}
              className={`${
                sorting.some((s) => s.id === "rating")
                  ? "bg-gray-300 font-bold text-black"
                  : "text-white"
              }`}
            >
              No. Rating + | -
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                handleSortToggle("abc");
              }}
              className={`${
                sorting.some((s) => s.id === "customerName")
                  ? "bg-gray-300 font-bold text-black"
                  : "text-white"
              }`}
            >
              ABC
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                handleSortToggle("123");
              }}
              className={`${
                sorting.some((s) => s.id === "id")
                  ? "bg-gray-300 font-bold text-black"
                  : "text-white"
              }`}
            >
              #123
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                setTagMenuOpen(!tagMenuOpen);
                handleSortToggle("tags");
              }}
              // merge this with the other className
              className={`px-3 py-1 text-sm hover:bg-gray-100 rounded-lg cursor-pointer ${
                selectedTags.length > 0 ? "bg-gray-300" : ""
              } ${
                sorting.some((s) => s.id === "tags")
                  ? "bg-gray-300 font-bold text-black"
                  : "text-white"
              }`}
            >
              TAG {selectedTags.length > 0 ? `(${selectedTags.length})` : ""}
            </DropdownMenuItem>
            {tagMenuOpen && (
              <div className="absolute -top-16 -left-60 bg-gray-200 rounded-xl p-2 flex gap-2">
                {tags.map((tag) => (
                  <Button
                    key={tag.label}
                    variant="ghost"
                    onClick={() => handleTagToggle(tag.value)}
                    className={`w-[110px] px-3 py-1 border rounded-full text-xs font-semibold ${
                      tag.color
                    } ${
                      selectedTags.includes(tag.value)
                        ? "ring-2 ring-offset-1 ring-blue-500"
                        : ""
                    }`}
                  >
                    {tag.label}
                  </Button>
                ))}
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          className="h-10 w-28 gap-2 rounded-xl bg-orange-500 text-white border-0 hover:bg-orange-600 hover:text-white"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>

      {/* ReviewList with top margin to accommodate the buttons */}
      <div className="mt-4">
        <ReviewList table={table} />
      </div>
    </div>
  );
};

export default ReviewsTable;
