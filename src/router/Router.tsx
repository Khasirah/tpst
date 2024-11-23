import Layout from "@/pages/layout/Layout.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import Login from "@/pages/Login.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import InputSurat from "@/pages/InputSurat.tsx";
import TandaTerima from "@/pages/TandaTerima.tsx";
import PrivateRoute from "@/components/PrivateRoute.tsx";
import UnprivateRoute from "@/components/UnprivateRoute.tsx";
import RegisterSurat from "@/pages/RegisterSurat.tsx";
import SettingsPage from "@/pages/SettingsPage.tsx";
import SuratPage from "@/pages/SuratPage.tsx";
import Petugas from "@/pages/Petugas.tsx";
import {loader as suratLoader} from "@/components/loader.tsx";
import SuratMasuk from "@/pages/SuratMasuk.tsx";
import {searchUser} from "@/api/User.tsx";
import AddUser from "@/pages/AddUser.tsx";
import AdminRoute from "@/components/AdminRoute.tsx";
import {createBrowserRouter} from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        element: <Layout/>,
        children: [
          {
            index: true,
            element: <Dashboard/>
          },
          {
            path: "suratMasuk",
            element: <SuratMasuk/>
          },
          {
            path: "inputSurat",
            element: <InputSurat/>
          },
          {
            path: "tandaTerima",
            element: <TandaTerima/>
          },
          {
            path: "registerSurat",
            element: <RegisterSurat/>
          },
          {
            path: "petugas",
            element: <AdminRoute/>,
            children: [
              {
                index: true,
                element: <Petugas/>,
                loader: searchUser
              },
              {
                path: ":idUser",
                element: <AddUser/>
              },
              {
                path: "tambahPetugas",
                element: <AddUser/>
              }
            ],
          },
          {
            path: "surat/:idSurat",
            element: <SuratPage/>,
            loader: suratLoader
          },
        ]
      },
    ]
  },
  {
    path: "/login",
    element: <UnprivateRoute/>,
    children: [
      {
        index: true,
        element: <Login/>
      }
    ]
  },
  {
    path: "/settings",
    element: <PrivateRoute/>,
    children: [
      {
        index: true,
        element: <SettingsPage/>
      }
    ]
  },
])