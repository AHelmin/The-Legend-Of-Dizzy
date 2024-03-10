import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookie from "js-cookie";
import "regenerator-runtime/runtime";
import Matterjs from "./components/matter";
// import AppProvider from "./providers/AppProvider"
import Header from "./components/Header";
import { Home, Game, Auth } from "./pages";
// import "/node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./output.css";
import AppProvider from "./providers/AppProvider";

export default function App() {
  function verifyUser() {
    const cookie = Cookie.get("auth_cookie");
  }

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/level2" element={<Game />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </>
  );
}
