import {Button} from "@/components/ui/button.tsx";
import {BellIcon} from "@radix-ui/react-icons";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {logout} from "@/api/Auth.tsx";
import {generatePhotoProfile, getToken} from "@/utils/Helper.tsx";
import useSecureLs from "@/hooks/useSecureLs.tsx";
import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {NavLink, useNavigate} from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const {getItem, clear} = useSecureLs();

  async function handleLogout() {
    await logout(getToken());
    clear();
    navigate("/login", {replace: true});
  }

  return (
    <div className={"h-14 border-b px-4 flex justify-between"}>
      <div className={"flex items-center"}>
        <SidebarTrigger/>
      </div>
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
                <AvatarFallback>
                  {generatePhotoProfile(getItem("namaUser"))}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{getItem("namaUser")}</DropdownMenuLabel>
              <div className={"px-2"}>
                <p className={"text-sm text-muted-foreground"}>{getItem("namaBagian")}</p>
                <p className={"text-sm"}>
                  {import.meta.env.VITE_NM_KANTOR}
                </p>
              </div>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>
                <NavLink to={"/profile"}>
                  Profile
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
