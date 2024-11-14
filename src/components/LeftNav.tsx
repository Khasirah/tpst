import {buttonVariants} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {ArchiveIcon, DashboardIcon, GearIcon, InputIcon, ListBulletIcon} from "@radix-ui/react-icons";
import {NavLink} from "react-router-dom";

export default function LeftNav() {

  return (
    <div>
      <div className={"flex justify-center items-center border-b h-14 px-4"}>
        <h1 className={"font-bold text-base"}>
          <span className={"mr-2 text-lg"}>📮</span>Aplikasi TPST Kanwil Jakpus
        </h1>
      </div>
      <div className={"w-full flex flex-col px-4 pt-4 gap-4"}>
        <NavLink
          to="/"
          className={({isActive}) =>
            cn(buttonVariants({
              size: "default",
              variant: isActive ? "default" : "ghost"
            }), "w-full h-12")
          }>
          <DashboardIcon className={"mr-2"}/>Dashboard
        </NavLink>
        <NavLink
          to="inputSurat"
          className={({isActive}) =>
            cn(buttonVariants({
              size: "default",
              variant: isActive ? "default" : "ghost"
            }), "w-full h-12")
          }>
          <InputIcon className={"mr-2"}/>Input Surat
        </NavLink>
        <NavLink
          to="tandaTerima"
          className={({isActive}) =>
            cn(buttonVariants({
              size: "default",
              variant: isActive ? "default" : "ghost"
            }), "w-full h-12")
          }>
          <ListBulletIcon className={"mr-2"}/>Tanda Terima
        </NavLink>
        <NavLink
          to="registerSurat"
          className={({isActive}) =>
            cn(buttonVariants({
              size: "default",
              variant: isActive ? "default" : "ghost"
            }), "w-full h-12")
          }>
          <ArchiveIcon className={"mr-2"}/>Register Surat
        </NavLink>
        <NavLink
          to="settings"
          className={({isActive}) =>
            cn(buttonVariants({
              size: "default",
              variant: isActive ? "default" : "ghost"
            }), "w-full h-12")
          }>
          <GearIcon className={"mr-2"}/>Settings
        </NavLink>
      </div>
    </div>
  )
}