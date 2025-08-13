import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Filter, Filter as FilterIcon, RefreshCw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Review, reviews } from "../../../common/data/data";
import Loader from "../../../common/Loader";
import { Button } from "../../../common/ui/button";
import { Card, CardContent } from "../../../common/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../common/ui/dropdown-menu";
import { Table, TableBody } from "../../../common/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../common/ui/tabs";
import { PaginationComponent } from "./Pagination";
import { ReviewCard } from "./ReviewCard";

const Dashboard: React.FC = () => {
  const [loading] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTabTagMenuOpen, setAllTabTagMenuOpen] = useState(false);
  const [publishedTabTagMenuOpen, setPublishedTabTagMenuOpen] = useState(false);
  const [deletedTabTagMenuOpen, setDeletedTabTagMenuOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Define tags with their colors
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

  // Close all tag menus when active tab changes
  useEffect(() => {
    setAllTabTagMenuOpen(false);
    setPublishedTabTagMenuOpen(false);
    setDeletedTabTagMenuOpen(false);
  }, [activeTab]);

  const handleTagToggle = (tag: string) => {
    // Update selected tags
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);

    // Apply tag filter
    if (!columnFilters.some((filter) => filter.id === "tags")) {
      setColumnFilters((prev) => [
        ...prev,
        { id: "tags", value: newSelectedTags },
      ]);
    } else {
      setColumnFilters((prev) =>
        prev.map((filter) =>
          filter.id === "tags"
            ? {
                ...filter,
                value: newSelectedTags,
              }
            : filter
        )
      );
    }
  };

  // Handle sorting by rating, alphabetical, or numeric
  const handleSortToggle = (sortType: string) => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);

    let sortId = "";

    if (sortType === "rating") {
      sortId = "rating";
    } else if (sortType === "abc") {
      sortId = "customerName";
    } else if (sortType === "123") {
      sortId = "id";
    }

    if (sortId) {
      setSorting([{ id: sortId, desc: newDirection === "desc" }]);
    }
  };

  const cardColumn: ColumnDef<Review>[] = [
    {
      id: "reviewCard",
      cell: ({ row }) => <ReviewCard review={row.original} />,
    },
    {
      id: "rating",
      accessorFn: (row) => row.rating,
    },
    {
      id: "customerName",
      accessorFn: (row) => row.customerName,
    },
    {
      id: "id",
      accessorFn: (row) => row.id,
    },
    {
      id: "tags",
      accessorFn: (row) => row.tags,
      filterFn: (row, id, filterValue) => {
        if (!filterValue || filterValue.length === 0) return true;
        const tags = row.getValue(id) as string[];
        // Return true if any of the row's tags are in the filter value array
        return tags.some((tag) => filterValue.includes(tag));
      },
    },
  ];

  // Filter data based on active tab
  const filteredData =
    activeTab === "all"
      ? reviews
      : activeTab === "published"
      ? reviews.filter((review) => review.status === "approved")
      : reviews.filter((review) => review.status === "archived");

  const table = useReactTable({
    data: filteredData,
    columns: cardColumn,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
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
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return loading ? (
    <Loader />
  ) : (
    <div className="space-y-4 px-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
        <div className="flex items-center">
          <Button variant="link" className="text-blue-500">
            Customer / <span className="text-gray-500 ml-1">Review</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between">
          <TabsList className="bg-white gap-8 px-5 mb-6 py-0 border-0 shadow-none">
            <TabsTrigger
              value="all"
              className="rounded-none h-full border-0 data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 relative data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 data-[state=active]:shadow-none"
            >
              All Reviews
            </TabsTrigger>
            <TabsTrigger
              value="published"
              className="rounded-none h-full border-0 data-[state=active]:border-b-2 data-[state=active]:text-blue-500 data-[state=active]:border-b-blue-500 relative data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 data-[state=active]:shadow-none"
            >
              Published
            </TabsTrigger>
            <TabsTrigger
              value="deleted"
              className="rounded-none h-full border-0 data-[state=active]:border-b-2 data-[state=active]:text-blue-500 data-[state=active]:border-b-blue-500 relative data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 data-[state=active]:shadow-none"
            >
              Deleted
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center justify-between px-4 mb-6 relative">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="default"
                      size="sm"
                      className="h-8 w-28 gap-2 rounded-xl"
                    >
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>

                  {/* First-level menu - positioned to the left */}
                  <DropdownMenuContent
                    side="left"
                    align="start"
                    className="bg-gray-200 rounded-xl p-2 shadow-md flex gap-3"
                  >
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        handleSortToggle("rating");
                      }}
                      className={`px-3 py-1 text-sm rounded-lg hover:bg-gray-300 cursor-pointer ${
                        sorting.some((s) => s.id === "rating")
                          ? "bg-gray-300 font-semibold"
                          : ""
                      }`}
                    >
                      No. Rating + | -
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        handleSortToggle("abc");
                      }}
                      className={`px-3 py-1 text-sm rounded-lg hover:bg-gray-300 cursor-pointer ${
                        sorting.some((s) => s.id === "customerName")
                          ? "bg-gray-300 font-semibold"
                          : ""
                      }`}
                    >
                      ABC
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        handleSortToggle("123");
                      }}
                      className={`px-3 py-1 text-sm rounded-lg hover:bg-gray-300 cursor-pointer ${
                        sorting.some((s) => s.id === "id")
                          ? "bg-gray-300 font-semibold"
                          : ""
                      }`}
                    >
                      #123
                    </DropdownMenuItem>

                    <div
                      onClick={() => setAllTabTagMenuOpen((o) => !o)}
                      className={`px-3 py-1 text-sm hover:bg-gray-100 rounded-lg cursor-pointer ${
                        selectedTags.length > 0 ? "bg-gray-300" : ""
                      }`}
                    >
                      TAG{" "}
                      {selectedTags.length > 0
                        ? `(${selectedTags.length})`
                        : ""}
                    </div>

                    {/* Second-level menu */}
                    {allTabTagMenuOpen && (
                      <div className="absolute -top-16 -left-40 bg-gray-200 rounded-xl p-2 flex gap-2">
                        {tags.map((tag) => (
                          <Button
                            key={tag.label}
                            variant={"ghost"}
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
                  className="h-8 w-28 gap-2 rounded-xl bg-orange-500 text-white border-0 hover:bg-orange-600"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Card className="shadow-none border-0">
          <CardContent className="p-0">
            <TabsContent value="all" className="p-0">
              <div className="bg-gray-100">
                <div className="rounded-md">
                  <Table>
                    <TableBody className="bg-gray-100">
                      {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                          <div
                            key={row.id}
                            className="py-1 rounded-3xl overflow-hidden"
                          >
                            <div data-state={row.getIsSelected() && "selected"}>
                              <div className="p-0">
                                {flexRender(
                                  row.getVisibleCells()[0].column.columnDef
                                    .cell,
                                  row.getVisibleCells()[0].getContext()
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No reviews found.</p>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 px-4 flex justify-between items-center bg-gray-100">
                  <div className="flex-1 text-sm text-muted-foreground">
                    Showing{" "}
                    {table.getState().pagination.pageIndex *
                      table.getState().pagination.pageSize +
                      1}{" "}
                    to{" "}
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) *
                        table.getState().pagination.pageSize,
                      table.getFilteredRowModel().rows.length
                    )}{" "}
                    of {table.getFilteredRowModel().rows.length} entries
                  </div>
                  <div className="flex items-center justify-end space-x-2 py-4">
                    <PaginationComponent
                      currentPage={table.getState().pagination.pageIndex + 1}
                      totalPages={Math.ceil(
                        table.getFilteredRowModel().rows.length /
                          table.getState().pagination.pageSize
                      )}
                      onPageChange={(page) => {
                        table.setPageIndex(page - 1);
                      }}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="published" className="p-0">
              <div className="flex items-center justify-between px-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="default"
                          size="sm"
                          className="h-8 w-28 gap-2 rounded-xl"
                        >
                          <FilterIcon className="h-4 w-4" />
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleSortToggle("rating")}
                          className={
                            sorting.some((s) => s.id === "rating")
                              ? "bg-gray-100 font-semibold"
                              : ""
                          }
                        >
                          No. Rating{" "}
                          {sortDirection === "asc" ? "+ | -" : "- | +"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleSortToggle("abc")}
                          className={
                            sorting.some((s) => s.id === "customerName")
                              ? "bg-gray-100 font-semibold"
                              : ""
                          }
                        >
                          ABC {sortDirection === "asc" ? "A-Z" : "Z-A"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleSortToggle("123")}
                          className={
                            sorting.some((s) => s.id === "id")
                              ? "bg-gray-100 font-semibold"
                              : ""
                          }
                        >
                          #123 {sortDirection === "asc" ? "1-9" : "9-1"}
                        </DropdownMenuItem>
                        {/* Tag trigger with hover functionality */}
                        <div
                          className="relative"
                          onMouseEnter={() => setPublishedTabTagMenuOpen(true)}
                          onMouseLeave={() => setPublishedTabTagMenuOpen(false)}
                        >
                          <DropdownMenuItem
                            className={`px-3 py-1 text-sm font-bold hover:bg-gray-300 cursor-pointer ${
                              selectedTags.length > 0 ? "bg-gray-100" : ""
                            }`}
                          >
                            TAG{" "}
                            {selectedTags.length > 0
                              ? `(${selectedTags.length})`
                              : ""}
                          </DropdownMenuItem>

                          {/* Second-level menu shown on hover */}
                          {publishedTabTagMenuOpen && (
                            <div className="absolute -top-14 left-0 bg-gray-200 rounded-xl p-2 flex flex-wrap gap-2 shadow-lg z-50 max-w-md">
                              {tags.map((tag) => (
                                <button
                                  key={tag.label}
                                  onClick={() => handleTagToggle(tag.value)}
                                  className={`px-3 py-1 border rounded-full text-xs font-semibold ${
                                    tag.color
                                  } ${
                                    selectedTags.includes(tag.value)
                                      ? "ring-2 ring-offset-1 ring-blue-500 font-bold"
                                      : ""
                                  } transition-all hover:scale-105`}
                                >
                                  {tag.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-28 gap-2 rounded-xl bg-orange-500 text-white border-0 hover:bg-orange-600"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100">
                <div className="rounded-md">
                  <Table>
                    <TableBody className="bg-gray-100">
                      {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                          <div
                            key={row.id}
                            className="py-1 rounded-3xl overflow-hidden"
                          >
                            <div
                              data-state={row.getIsSelected() && "selected"}
                              className="rounded-xl bg-white border-none hover:shadow-md hover:bg-gray-50"
                            >
                              <div className="py-4 px-4">
                                {flexRender(
                                  row.getVisibleCells()[0].column.columnDef
                                    .cell,
                                  row.getVisibleCells()[0].getContext()
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No reviews found.</p>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 px-4 flex justify-between items-center bg-gray-100">
                  <div className="flex-1 text-sm text-muted-foreground">
                    Showing{" "}
                    {table.getState().pagination.pageIndex *
                      table.getState().pagination.pageSize +
                      1}{" "}
                    to{" "}
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) *
                        table.getState().pagination.pageSize,
                      table.getFilteredRowModel().rows.length
                    )}{" "}
                    of {table.getFilteredRowModel().rows.length} entries
                  </div>
                  <div className="flex items-center justify-end space-x-2 py-4">
                    <PaginationComponent
                      currentPage={table.getState().pagination.pageIndex + 1}
                      totalPages={Math.ceil(
                        table.getFilteredRowModel().rows.length /
                          table.getState().pagination.pageSize
                      )}
                      onPageChange={(page) => {
                        table.setPageIndex(page - 1);
                      }}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="deleted" className="p-0">
              <div className="flex items-center justify-between px-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="default"
                          size="sm"
                          className="h-8 w-28 gap-2 rounded-xl"
                        >
                          <FilterIcon className="h-4 w-4" />
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleSortToggle("rating")}
                          className={
                            sorting.some((s) => s.id === "rating")
                              ? "bg-gray-100 font-semibold"
                              : ""
                          }
                        >
                          No. Rating{" "}
                          {sortDirection === "asc" ? "+ | -" : "- | +"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleSortToggle("abc")}
                          className={
                            sorting.some((s) => s.id === "customerName")
                              ? "bg-gray-100 font-semibold"
                              : ""
                          }
                        >
                          ABC {sortDirection === "asc" ? "A-Z" : "Z-A"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleSortToggle("123")}
                          className={
                            sorting.some((s) => s.id === "id")
                              ? "bg-gray-100 font-semibold"
                              : ""
                          }
                        >
                          #123 {sortDirection === "asc" ? "1-9" : "9-1"}
                        </DropdownMenuItem>
                        {/* Tag trigger with hover functionality */}
                        <div
                          className="relative"
                          onMouseEnter={() => setDeletedTabTagMenuOpen(true)}
                          onMouseLeave={() => setDeletedTabTagMenuOpen(false)}
                        >
                          <DropdownMenuItem
                            className={`px-3 py-1 text-sm font-bold hover:bg-gray-300 cursor-pointer ${
                              selectedTags.length > 0 ? "bg-gray-100" : ""
                            }`}
                          >
                            TAG{" "}
                            {selectedTags.length > 0
                              ? `(${selectedTags.length})`
                              : ""}
                          </DropdownMenuItem>

                          {/* Second-level menu shown on hover */}
                          {deletedTabTagMenuOpen && (
                            <div className="absolute -top-14 left-0 bg-gray-200 rounded-xl p-2 flex flex-wrap gap-2 shadow-lg z-50 max-w-md">
                              {tags.map((tag) => (
                                <button
                                  key={tag.label}
                                  onClick={() => handleTagToggle(tag.value)}
                                  className={`px-3 py-1 border rounded-full text-xs font-semibold ${
                                    tag.color
                                  } ${
                                    selectedTags.includes(tag.value)
                                      ? "ring-2 ring-offset-1 ring-blue-500 font-bold bg-opacity-90"
                                      : ""
                                  } transition-all hover:scale-105`}
                                >
                                  {tag.label}
                                  {selectedTags.includes(tag.value) && " ✓"}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-28 gap-2 rounded-xl bg-orange-500 text-white border-0 hover:bg-orange-600"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100">
                <div className="rounded-md">
                  <Table>
                    <TableBody className="bg-gray-100">
                      {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                          <div
                            key={row.id}
                            className="py-1 rounded-3xl overflow-hidden"
                          >
                            <div
                              data-state={row.getIsSelected() && "selected"}
                              className="rounded-xl bg-white border-none hover:shadow-md hover:bg-gray-50"
                            >
                              <div className="py-4 px-4">
                                {flexRender(
                                  row.getVisibleCells()[0].column.columnDef
                                    .cell,
                                  row.getVisibleCells()[0].getContext()
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No reviews found.</p>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 px-4 flex justify-between items-center bg-gray-100">
                  <div className="flex-1 text-sm text-muted-foreground">
                    Showing{" "}
                    {table.getState().pagination.pageIndex *
                      table.getState().pagination.pageSize +
                      1}{" "}
                    to{" "}
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) *
                        table.getState().pagination.pageSize,
                      table.getFilteredRowModel().rows.length
                    )}{" "}
                    of {table.getFilteredRowModel().rows.length} entries
                  </div>
                  <div className="flex items-center justify-end space-x-2 py-4">
                    <PaginationComponent
                      currentPage={table.getState().pagination.pageIndex + 1}
                      totalPages={Math.ceil(
                        table.getFilteredRowModel().rows.length /
                          table.getState().pagination.pageSize
                      )}
                      onPageChange={(page) => {
                        table.setPageIndex(page - 1);
                      }}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default Dashboard;
