import {buttonVariants} from "@/components/ui/button.tsx";
import {useState} from "react";
import {ListPages} from "@/types/ListPages.tsx";
import {cn} from "@/lib/utils.ts";
import {ArchiveIcon, DashboardIcon, GearIcon, InputIcon, ListBulletIcon} from "@radix-ui/react-icons";

export default function LeftNav() {
  const [page, setPage] = useState(ListPages.dashboard)

  return (
    <div>
      <div className={"flex justify-center items-center border-b h-14 px-4"}>
        <h1 className={"font-bold text-base"}>
          <span className={"mr-2 text-lg"}>📮</span>Aplikasi TPST Kanwil Jakpus
        </h1>
      </div>
      <div className={"w-full flex flex-col px-4 pt-4 gap-4"}>
        <a
          href="/dashboard"
          className={
            cn(buttonVariants({
              size: "default",
              variant: page === ListPages.dashboard ? "default" : "ghost"
            }), "w-full h-12")
          }>
          <DashboardIcon className={"mr-2"}/>Dashboard
        </a>
        <a
          href="/inputSurat"
          className={
            cn(buttonVariants({
              size: "default",
              variant: page === ListPages.inputSurat ? "default" : "ghost"
            }), "w-full h-12")
          }>
          <InputIcon className={"mr-2"}/>Input Surat
        </a>
        <a
          href="/TandaTerima"
          className={
            cn(buttonVariants({
              size: "default",
              variant: page === ListPages.tandaTerima ? "default" : "ghost"
            }), "w-full h-12")
          }>
          <ListBulletIcon className={"mr-2"}/>Tanda Terima
        </a>
        <a
          href="/registerSurat"
          className={
            cn(buttonVariants({
              size: "default",
              variant: page === ListPages.registerSurat ? "default" : "ghost"
            }), "w-full h-12")
          }>
          <ArchiveIcon className={"mr-2"}/>Register Surat
        </a>
        <a
          href="/settings"
          className={
            cn(buttonVariants({
              size: "default",
              variant: page === ListPages.settings ? "default" : "ghost"
            }), "w-full h-12")
          }>
          <GearIcon className={"mr-2"}/>Settings
        </a>
      </div>
    </div>
  )
}