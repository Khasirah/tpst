import {Calendar} from "@/components/ui/calendar"
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {cn} from "@/lib/utils.ts";
import {getSuratByDate} from "@/api/Surat.tsx";
import {WebResponse} from "@/model/response/WebResponse.tsx";
import {ForListSuratResponse} from "@/model/response/ForListSuratResponse.tsx";
import {useToast} from "@/hooks/use-toast.ts";

type SuratMasukForm = {
  setDataHandler: (data: WebResponse<ForListSuratResponse[]>) => void
}

function SuratMasukForm(
  {
    setDataHandler
  }: SuratMasukForm
) {
  const [date, setDate] = useState<Date | undefined>();
  const {toast} = useToast();

  function dateSelectHandler(e: Date | undefined) {
    if (e != undefined) {
      setDate(e)
      getSuratByDate(e)
        .then((data) => {
          setDataHandler(data)
        })
        .catch((reason) => {
          toast({
            variant: "destructive",
            description: reason
          })
        })
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] pl-3 text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? (
            format(date, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={e => {
            dateSelectHandler(e)
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default SuratMasukForm;