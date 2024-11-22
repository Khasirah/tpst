import Header from "@/components/Header.tsx";
import {Outlet} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.tsx";
import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/AppSidebar.tsx";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className={"w-full"}>
        <Header/>
        <div className={"px-4 pt-4"}>
          <Outlet/>
          <Toaster/>
        </div>
      </main>
    </SidebarProvider>
  )
}