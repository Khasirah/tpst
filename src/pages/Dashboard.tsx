import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {EnvelopeClosedIcon, PersonIcon} from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import TitlePage from "@/components/TitlePage";
import {Separator} from "@/components/ui/separator";
import {useEffect, useState} from "react";
import {DashboardResponse} from "@/model/response/DashboardResponse.tsx";
import {getDashboard} from "@/api/Dashboard.tsx";
import * as React from "react";
import {Loading} from "@/components/Loading.tsx";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(data => {
        setDashboardData(data)
      })
      .catch(e => {})
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return isLoading ?
    <Loading/> : (
      <div className={"flex flex-col gap-3"}>
        <TitlePage title={"Dashboard"}/>
        <Separator className={"mb-4"}/>
        <div className={"grid gap-4 md:grid-cols-2 lg:grid-cols-4"}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Surat Masuk</CardTitle>
              <EnvelopeClosedIcon/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.totalSuratMasuk}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Surat di TPST</CardTitle>
              <EnvelopeClosedIcon/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.totalSuratAtTPST}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Petugas</CardTitle>
              <PersonIcon/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.totalPetugas}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Surat yang Telah Diinput Oleh Anda
              </CardTitle>
              <PersonIcon/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.totalSuratByPetugasTPST}</div>
            </CardContent>
          </Card>
        </div>
        <div className={"mt-4"}>
          <Card>
            <CardHeader>
              <CardTitle className={"text-xl"}>Data Surat Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>{
                  dashboardData.newestSuratInbound.length != 0 ?
                    "Daftar surat terbaru."
                    : "Tidak ada data"
                }</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nomor Surat</TableHead>
                    <TableHead>Perihal</TableHead>
                    <TableHead>Pengirim</TableHead>
                    <TableHead>Petugas</TableHead>
                    <TableHead>Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    dashboardData.newestSuratInbound.length != 0 ?
                      dashboardData.newestSuratInbound.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.nomorSurat}</TableCell>
                          <TableCell>{item.perihal}</TableCell>
                          <TableCell>{item.namaPengirim}</TableCell>
                          <TableCell>{item.namaPetugasTpst}</TableCell>
                          <TableCell>{new Date(item.tanggalTerima).toLocaleString()}</TableCell>
                        </TableRow>
                      ))
                      : <></>
                  }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    )
}
