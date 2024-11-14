import {Navigate, Outlet} from "react-router-dom";
import {useState} from "react";
import {Loading} from "@/components/Loading.tsx";
import {getCurrentUser} from "@/api/User.tsx";


export default function PrivateRoute() {

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
    <Outlet/>
  ) : (
    <Navigate to={"/login"}/>
  )
}