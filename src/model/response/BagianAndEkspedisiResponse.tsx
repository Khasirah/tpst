import {Bagian} from "@/model/Bagian.tsx";
import {Ekspedisi} from "@/model/Ekspedisi.tsx";

export type BagianAndEkspedisiResponse = {
  bagianList: Bagian[],
  ekspedisiList: Ekspedisi[]
}