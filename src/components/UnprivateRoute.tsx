import {useEffect, useState} from "react";
import {getCurrentUser} from "@/api/User.tsx";
import {Loading} from "@/components/Loading.tsx";
import {Navigate, Outlet} from "react-router-dom";

export default function UnprivateRoute() {

  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      getCurrentUser()
        .then(() => {
          setIsLogin(true)
        })
        .catch(() => {})
        .finally(() => setIsLoading(false))
    }
    , [])


  return isLoading ? (
    <Loading/>
  ) : isLogin ? (
    <Navigate to={"/"}/>
  ) : (
    <Outlet/>
  )
}