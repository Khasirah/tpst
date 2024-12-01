import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import Dashboard from "@/pages/Dashboard.tsx";
import PrivateRoute from "@/components/PrivateRoute.tsx";
import Layout from "@/pages/layout/Layout.tsx";
import Login from "@/pages/Login.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import UnprivateRoute from "@/components/UnprivateRoute.tsx";
import SuratMasuk from "@/pages/SuratMasuk.tsx";
import InputSurat from "@/pages/InputSurat.tsx";
import TandaTerima from "@/pages/TandaTerima.tsx";
import Petugas from "@/pages/Petugas.tsx";
import AddUser from "@/pages/AddUser.tsx";
import EditUser from "@/pages/EditUser.tsx";
import UploadPage from "@/pages/UploadPage.tsx";
import AdminRoute from "@/components/AdminRoute.tsx";
import ProfilePage from "@/pages/ProfilePage.tsx";
import DetailSurat from "@/pages/DetailSurat.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={"dark"} storageKey={"ui-theme"}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<PrivateRoute/>} errorElement={<ErrorPage/>}>
            <Route element={<Layout/>}>
              <Route index element={<Dashboard/>}/>
              <Route path={"suratMasuk"} element={ <SuratMasuk/> } />
              <Route path={"inputSurat"} element={ <InputSurat/> } />
              <Route path={"tandaTerima"} element={ <TandaTerima/> }/>
              <Route path={"petugas"} element={ <AdminRoute/> }>
                <Route index element={ <Petugas/> }/>
                <Route path={"tambahPetugas"} element={ <AddUser/> } />
                <Route path={"uploadPetugas"} element={ <UploadPage/> } />
                <Route path={":idUser"} element={ <EditUser/> } />
              </Route>
              <Route path={"profile"} element={ <ProfilePage/> }/>
              <Route path={"surat/:idSurat"} element={<DetailSurat/>} />
            </Route>
          </Route>
          <Route element={<UnprivateRoute/>} errorElement={<ErrorPage/>}>
            <Route path={"/login"} element={<Login/>}/>
          </Route>
          <Route path={"*"} element={ <ErrorPage/> }/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
