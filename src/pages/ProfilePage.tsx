import TitlePage from "@/components/TitlePage.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import EditUserForm from "@/components/EditUser.Form.tsx";
import {useEffect, useState} from "react";
import {getCurrentUser} from "@/api/User.tsx";
import {UserResponse} from "@/model/response/UserResponse.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import {Loading} from "@/components/Loading.tsx";

function ProfilePage() {
  const [user, setUser] = useState<UserResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const {toast} = useToast();

  useEffect(() => {
    getCurrentUser()
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
  }, [])

  return (
    isLoading
      ? <Loading/>
      : (
        <div className={"flex flex-col gap-3"}>
          <TitlePage title={"Profile"}/>
          <Separator className={"mb-4"}/>
          <EditUserForm user={user as UserResponse} isCurrentUser={true}/>
        </div>
      )
  )
}

export default ProfilePage;