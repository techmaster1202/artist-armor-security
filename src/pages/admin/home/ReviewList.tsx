import { flexRender, Table } from "@tanstack/react-table";
import { Review } from "../../../common/data/data";
import { PaginationComponent } from "./Pagination";

interface ReviewListProps {
  table: Table<Review>;
}

export function ReviewList({ table }: ReviewListProps) {
  return (
    <>
      <div className="bg-gray-100">
        <div className="rounded-md">
          <div className="bg-gray-100">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <div key={row.id} className="py-1 rounded-3xl overflow-hidden">
                  <div data-state={row.getIsSelected() && "selected"}>
                    <div className="p-0">
                      {flexRender(
                        row.getVisibleCells()[0].column.columnDef.cell,
                        row.getVisibleCells()[0].getContext()
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews found.</p>
            )}
          </div>
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
    </>
  );
}
