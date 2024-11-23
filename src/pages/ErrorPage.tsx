import {Button} from "@/components/ui/button.tsx";
import {NavLink} from "react-router";

export default function ErrorPage() {

  return (
    <div
      id="error-page"
      className={"flex flex-col justify-center items-center h-screen gap-2"}
    >
      <h1
        className={"text-4xl"}
      >Oops!</h1>
      <p>Sorry, the page is not found</p>
      <Button asChild>
        <NavLink to={"/"}>
          Back to Dashboard
        </NavLink>
      </Button>
    </div>
  );
}