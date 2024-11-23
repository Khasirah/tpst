import TitlePage from "@/components/TitlePage.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {z} from "zod";
import {addUserSchema} from "@/types/AddUserSchema.tsx";
import {RegisterUserRequest} from "@/model/request/RegisterUserRequest.ts";
import {registerUser} from "@/api/User.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import AddUserForm from "@/components/AddUser.Form.tsx";


function AddUser() {
  const {toast} = useToast();

  function onSubmit(data: z.infer<typeof addUserSchema>) {
    const request: RegisterUserRequest = {
      idUser: data.idUser,
      namaUser: data.namaUser,
      password: data.idUser,
      idBagian: parseInt(data.idBagian),
      idKelompok: parseInt(data.idKelompok)
    }

    registerUser(request)
      .then(response => {
        toast({
          description: response
        })
      })
      .catch(e => {
        toast({
          variant: "destructive",
          description: e
        })
      })
  }

  return (
    <div className={"flex flex-col gap-3"}>
      <TitlePage title={"Tambah Petugas"}/>
      <Separator className={"mb-4"}/>
      <div>
        <AddUserForm onSubmitHandle={onSubmit}/>
      </div>
    </div>
  )
}

export default AddUser;