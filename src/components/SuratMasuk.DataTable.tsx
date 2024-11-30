"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel, getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {useState} from "react";
import {PagingResponse} from "@/model/response/PagingResponse.tsx";
import {Button} from "@/components/ui/button.tsx";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  paging: PagingResponse
}

export function SuratMasukDataTable<TData, TValue>(
  {
    columns,
    data,
    paging
  }: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const table = useReactTable({
    data,
    columns,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: paging.totalPage,
    state: {
      rowSelection,
      pagination
    }
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div>
          <p className={"text-sm"}>
            {table.getRowModel().rows?.length
              ?
              `page ${pagination.pageIndex + 1} of ${table.getPageCount()} pages`
              : ""
            }
          </p>
        </div>
        <div className={"flex items-center space-x-2"}>
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            First Page
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            Last Page
          </Button>
        </div>
      </div>
    </div>
  )
}
