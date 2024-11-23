import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getSpecificUser} from "@/api/User.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import {UserResponse} from "@/model/response/UserResponse.tsx";
import EditUserForm from "@/components/EditUser.Form.tsx";
import {Loading} from "@/components/Loading.tsx";
import TitlePage from "@/components/TitlePage.tsx";
import {Separator} from "@/components/ui/separator.tsx";

function EditUser() {
  const {idUser} = useParams();
  const {toast} = useToast();
  const [user, setUser] = useState<UserResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (idUser != undefined) {
      getSpecificUser(idUser)
        .then(user => {
          setUser(user)
        })
        .catch(e => {
          toast({
            variant: "destructive",
            description: e
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, []);

  return (
    <div>
      {
        isLoading
          ? <Loading/>
          : (
            <div className={"flex flex-col gap-3"}>
              <TitlePage title={"Edit Petugas"}/>
              <Separator className={"mb-4"}/>
              <EditUserForm user={user as UserResponse}/>
            </div>
          )
      }
    </div>
  )
}

export default EditUser;