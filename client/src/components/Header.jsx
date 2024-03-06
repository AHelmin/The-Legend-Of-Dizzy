import { useState, useEffect } from "react"
import Cookie from "js-cookie" 
import useVerifyUser from "../hooks/useVerifyUser"
import { useAppCtx } from "../providers/AppProvider"

export default function Header(){
  
  const { isLoggedIn, logout } = useVerifyUser()
  const { welcomeMsg } = useAppCtx()

  // useEffect( () => {
  //   setUserLoggedIn( verifyUser() )
  // },[])


  return (
    <header className="container mb-5 py-2">
      <div className="row">
        <div className="col-8">
          <h1>
            <a href="/" style={{ textDecoration: "none" }}>
              Note Taker App
            </a>
          </h1>
        </div>

        <div className="col-4">
          
          { isLoggedIn === true ? (
            <p className="mt-3">
              { welcomeMsg } &nbsp;
              <span onClick={logout}>Logout</span>
            </p>
          ) : (
            <p className="mt-3">
              <a href="/auth">
                Login or signup please!
              </a>
            </p>
          )}

        </div>
      </div>
    </header>
  )
}