import {useState} from "react";
import {getCurrentUser} from "@/api/User.tsx";
import {Loading} from "@/components/Loading.tsx";
import {Navigate, Outlet} from "react-router-dom";

export default function UnprivateRoute() {

  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  getCurrentUser()
    .then(() => {
      setIsLogin(true)
    })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => setIsLoading(false))

  return isLoading ? (
    <Loading/>
  ) : isLogin ? (
    <Navigate to={"/"}/>
  ) : (
    <Outlet />
  )
}