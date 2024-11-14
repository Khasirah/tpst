import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {RouterProvider} from "react-router-dom";
import {router} from "@/router/Router.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={"dark"} storageKey={"ui-theme"}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  </StrictMode>,
)
