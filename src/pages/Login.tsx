import * as React from "react"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {ExclamationTriangleIcon, ReloadIcon} from "@radix-ui/react-icons";
import {LoginField, loginSchema} from "@/types/LoginSchema.tsx";

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: {errors, isSubmitting}
  } = useForm<LoginField>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      nip9: "",
      password: ""
    }
  })

  async function onSubmit(data: LoginField) {
    // todo : post to api
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setError("root", {
      message: "login gagal, silahkan pastikan nip 9 dan password benar"
    })
    console.log(data)
    reset({
      nip9: "",
      password: ""
    }, {
      keepErrors: true
    })
  }

  return (
    <div className={"w-screen h-screen grid place-content-center"}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>TPST Kanwil Jakpus</CardTitle>
          <CardDescription>Aplikasi input surat masuk Kanwil Jakpus</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} method={"post"}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              {errors.root && (
                <Alert variant="destructive">
                  <ExclamationTriangleIcon className="h-4 w-4"/>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {errors.root.message}
                  </AlertDescription>
                </Alert>
              )}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nip">NIP 9</Label>
                <Input
                  id="nip"
                  name={"nip"}
                  placeholder="NIP 9 SIKKA"
                  {...register("nip9")}
                />
                {errors.nip9 && <p className={"text-red-500 text-xs"}>{errors.nip9.message}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type={"password"}
                  id="password"
                  name={"password"}
                  placeholder="Password"
                  {...register("password")}/>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type={"submit"} disabled={isSubmitting}>
              {isSubmitting ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/> : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}