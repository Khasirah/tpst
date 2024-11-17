import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading.tsx";
import { getCurrentUser } from "@/api/User.tsx";
import useSecureLs from "@/hooks/useSecureLs.tsx";

export default function PrivateRoute() {
  const { setItem } = useSecureLs();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setIsLogin(true);
        setItem("idUser", user.idUser);
        setItem("namaUser", user.namaUser);
        setItem("namaBagian", user.bagian.namaBagian);
        setItem("namaKelompok", user.kelompok.namaKelompok);
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <Loading />
  ) : isLogin ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
}
