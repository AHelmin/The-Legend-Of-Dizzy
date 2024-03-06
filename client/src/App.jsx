import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cookie from "js-cookie"
import AppProvider from "./providers/AppProvider"
import Header from "./components/Header"
import { Auth } from "./pages"
import "/node_modules/bootstrap/dist/css/bootstrap.min.css"

export default function App() {

  function verifyUser(){
    const cookie = Cookie.get("auth_cookie")
  }

  useEffect(() => {
    verifyUser()
  },[])

  return (
    <AppProvider>
      <Header />
      <BrowserRouter>
        <Routes>

          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

