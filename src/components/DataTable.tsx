import {
  ColumnDef, ColumnFiltersState,
  flexRender,
  getCoreRowModel, getFilteredRowModel,
  getSortedRowModel, OnChangeFn,
  SortingState,
  useReactTable
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import * as React from "react";
import {Plus, UploadIcon} from "lucide-react";
import {PagingResponse} from "@/model/response/PagingResponse.tsx";
import {searchUser} from "@/api/User.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import {NavLink} from "react-router";
import {WebResponse} from "@/model/response/WebResponse.tsx";
import {UserResponse} from "@/model/response/UserResponse.tsx";

interface DataTableProps<TData, TValue> extends ForPageType {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  paging: PagingResponse,
  dataChangeHandler: (data: WebResponse<UserResponse[]>) => void
}

interface ForPageType {
  page: "surat" | "petugas"
}

export default function DataTable<TData, TValue>(
  {
    columns,
    data,
    page,
    paging,
    dataChangeHandler
  }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>()
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onSortingChange: setSorting as OnChangeFn<SortingState>,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    pageCount: paging.totalPage,
    state: {
      sorting,
      columnFilters,
      pagination
    }
  })
  const {toast} = useToast();

  useEffect(() => {

    searchUser(
      undefined,
      undefined,
      pagination.pageIndex,
      pagination.pageSize
    )
      .then(data => {
        dataChangeHandler(data)
      })
      .catch(e => {
        toast({
          description: e
        })
      })
  }, [pagination])

  return (
    <div>
      <div className={"flex flex-row justify-between"}>
        <div className={"flex gap-4"}>
          <Input
            placeholder={page === "surat" ? "Filter nomor surat..." : "Filter NIP..."}
            value={(table.getColumn(page === "surat" ? "nomorSurat" : "idUser")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn(page === "surat" ? "nomorSurat" : "idUser")?.setFilterValue(event.target.value)
              searchUser(
                event.target.value,
                undefined,
                0,
                pagination.pageSize
              )
                .then(data => {
                  dataChangeHandler(data)
                })
                .catch(e => {
                  toast({
                    description: e
                  })
                })
            }}
            className="max-w-56 mb-4"
          />
          {page === "petugas" && (
            <Input
              placeholder={"Filter Nama..."}
              value={(table.getColumn("namaUser")?.getFilterValue() as string) ?? ""}
              onChange={(event) => {
                table.getColumn("namaUser")?.setFilterValue(event.target.value)
                searchUser(
                  undefined,
                  event.target.value,
                  0,
                  pagination.pageSize
                )
                  .then(data => {
                    dataChangeHandler(data)
                  })
                  .catch(e => {
                    toast({
                      description: e
                    })
                  })
              }}
              className="max-w-56 mb-4"
            />
          )}
        </div>
        {
          page === "petugas" && (
            <div className={"space-x-2"}>
              <Button asChild>
                <NavLink to={"/petugas/tambahPetugas"}>
                  <Plus/> Tambah User
                </NavLink>
              </Button>
              <Button asChild>
                <NavLink to={"/petugas/uploadPetugas"}>
                  <UploadIcon/> Upload
                </NavLink>
              </Button>
            </div>
          )
        }
      </div>
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
            page {pagination.pageIndex + 1} of {table.getPageCount()} pages
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