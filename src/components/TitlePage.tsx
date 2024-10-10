import {TitlePageProps} from "@/types/Props.ts";

export default function TitlePage({title}: TitlePageProps) {
  return (
    <div className={"flex flex-col gap-2"}>
      <h3 className={"font-bold text-2xl"}>{title}</h3>
    </div>
  )
}