import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading.tsx";
import { getCurrentUser } from "@/api/User.tsx";

export default function AdminRoute() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user.kelompok.id == 1) setIsAdmin(true)
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false)
      });
  }, []);

  return isLoading ? (
    <Loading />
  ) : isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
}
