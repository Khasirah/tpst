import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Loading() {
  return (
    <div className={"h-screen flex justify-center items-center"}>
    <Button disabled>
      <Loader2 className="animate-spin"/>
      Please wait
    </Button>
    </div>
  )
}
