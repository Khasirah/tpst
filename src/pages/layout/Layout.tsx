import Header from "@/components/Header.tsx";
import LeftNav from "@/components/LeftNav.tsx";
import {Outlet} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.tsx";

export default function Layout() {
  return (
    <div className={"grid grid-cols-5 h-screen"}>
      <div className={"h-full border-r"}>
        <LeftNav/>
      </div>
      <div className={"col-span-4"}>
        <Header/>
        <div className={"px-4 pt-4"}>
          <Outlet/>
          <Toaster/>
        </div>
      </div>
    </div>
  )
}