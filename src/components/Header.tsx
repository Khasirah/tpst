import {Button} from "@/components/ui/button.tsx";
import {BellIcon} from "@radix-ui/react-icons";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";

export default function Header() {
  return (
    <div className={"h-14 border-b px-4 flex justify-end"}>
      <div className={"flex gap-2 items-center"}>
        <div>
          <Button variant={"ghost"} size={"icon"}>
            <BellIcon/>
          </Button>
          <ModeToggle/>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>AH</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Ahmad Haris Kurniawan</DropdownMenuLabel>
              <div className={"px-2"}>
                <p className={"text-sm"}>Bidang Data Potensi dan Pengawasan Perpajakan</p>
                <p className={"text-xs"}>Seksi Dukungan Teknis Komputer</p>
              </div>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}