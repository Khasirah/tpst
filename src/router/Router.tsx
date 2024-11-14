import {createBrowserRouter} from "react-router-dom";
import Layout from "@/pages/layout/Layout.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import Login from "@/pages/Login.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import InputSurat from "@/pages/InputSurat.tsx";
import TandaTerima from "@/pages/TandaTerima.tsx";
import PrivateRoute from "@/components/PrivateRoute.tsx";
import UnprivateRoute from "@/components/UnprivateRoute.tsx";
import RegisterSurat from "@/pages/RegisterSurat.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    errorElement: <ErrorPage/>,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Dashboard/>
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
            element: <RegisterSurat />
          }
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
        element: <Login />
      }
    ]
  },
])