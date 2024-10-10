import Header from "@/components/Header.tsx";
import LeftNav from "@/components/LeftNav.tsx";
import {LayoutProps} from "@/types/Props.ts";

export default function Layout(
  {
    children
  }: LayoutProps ) {
  return (
    <div className={"grid grid-cols-5 h-screen"}>
      <div className={"h-full border-r"}>
        <LeftNav/>
      </div>
      <div className={"col-span-4"}>
        <Header/>
        <div className={"px-4 pt-4"}>
          {/* todo: main content */}
          {children}
        </div>
      </div>
    </div>
  )
}