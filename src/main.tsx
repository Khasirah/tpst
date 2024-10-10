import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Layout from "@/pages/layout/Layout.tsx";
import Login from "@/pages/Login.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import TandaTerima from "@/pages/TandaTerima.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={"dark"} storageKey={"ui-theme"}>
      {/*<Login/>*/}
      <Layout>
        <TandaTerima />
      </Layout>
    </ThemeProvider>
  </StrictMode>,
)
