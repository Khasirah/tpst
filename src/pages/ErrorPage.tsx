import {useRouteError} from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div
      id="error-page"
      className={"flex flex-col justify-center items-center h-screen"}
    >
      <h1
      className={"text-4xl"}
      >Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.status} {error.statusText || error.message}</i>
      </p>
    </div>
  );
}