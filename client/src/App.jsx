import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookie from "js-cookie";
import "regenerator-runtime/runtime";
import { Home, Game, Auth, Contact } from "./pages"
import "./output.css";


export default function App() {
  function verifyUser() {
    const cookie = Cookie.get("auth_cookie");
  }

  useEffect(() => {
    verifyUser();
  }, []);

  return (
  <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/auth" element={<Auth />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      </>
  )
}
