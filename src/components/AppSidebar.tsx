import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  ArchiveIcon,
  DashboardIcon,
  EnvelopeClosedIcon, GearIcon,
  InputIcon,
  ListBulletIcon,
  PersonIcon
} from "@radix-ui/react-icons";
import {IconProps} from "@radix-ui/react-icons/dist/types";
import * as React from "react";
import {NavLink} from "react-router";

type LinkPage = {
  title: string
  url: string,
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
}

const items: LinkPage[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: DashboardIcon
  },
  {
    title: "Surat Masuk",
    url: "/suratMasuk",
    icon: EnvelopeClosedIcon
  },
  {
    title: "Input Surat",
    url: "/inputSurat",
    icon: InputIcon
  },
  {
    title: "Tanda Terima",
    url: "/tandaTerima",
    icon: ListBulletIcon
  },
  {
    title: "Register Surat",
    url: "/registerSurat",
    icon: ArchiveIcon
  },
  {
    title: "Petugas",
    url: "/petugas",
    icon: PersonIcon
  },
  {
    title: "Settings",
    url: "/settings",
    icon: GearIcon
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className={"flex justify-center items-center h-14 px-4"}>
          <h1 className={"font-bold"}>
            <span className={"mr-2 text-lg"}>📮</span>Aplikasi TPST Kanwil Jakpus
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className={"px-2"}>
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.title}>
              <NavLink
                to={item.url}
              >
                {({isActive}) => (
                  <SidebarMenuButton isActive={isActive}>
                    <item.icon className={"mr-2"}/>
                    {item.title}
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter/>
    </Sidebar>
  )
}
