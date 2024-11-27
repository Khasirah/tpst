import {ColumnDef} from "@tanstack/react-table";
import {UserResponse} from "@/model/response/UserResponse.tsx";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {Pencil2Icon, TrashIcon} from "@radix-ui/react-icons";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {deleteUser, searchUser} from "@/api/User.tsx";
import {NavLink} from "react-router";
import {WebResponse} from "@/model/response/WebResponse.tsx";

export const columnsPetugas = (
  dataChangeHandler: (data: WebResponse<UserResponse[]>) => void
): ColumnDef<UserResponse>[] => {
  return [
    {
      header: "No",
      cell: ({row, table}) => {
        const pagination = table.getState().pagination
        return <div>{row.index + 1 + (pagination.pageIndex * pagination.pageSize)}</div>
      }
    },
    {
      accessorKey: "idUser",
      header: "NIP Pendek"
    },
    {
      accessorKey: "namaUser",
      header: "Nama"
    },
    {
      accessorKey: "bagian.namaBagian",
      header: "Bidang"
    },
    {
      accessorKey: "kelompok.namaKelompok",
      header: "Role"
    },
    {
      id: "actions",
      cell: ({row,table}) => {
        const user = row.original
        const state = table.getState()

        function onDeleteHandler() {
          deleteUser(user.idUser)
            .catch(() => {
            })
            .then(() => {
              searchUser(
                "",
                "",
                state.pagination.pageIndex,
                state.pagination.pageSize
              )
                .then(data => {
                  dataChangeHandler(data)
                })
                .catch(() => {})
            })
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
              >
                <NavLink
                  to={`/petugas/${user.idUser}`}
                  className={"flex gap-2"}
                >
                  <Pencil2Icon/> Edit
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={e => e.preventDefault()}
              >
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className={"flex gap-2"}>
                      <TrashIcon/> Delete
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={onDeleteHandler}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]
}
