import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { useNavigate } from "react-router-dom"

export default function Auth() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signupData, setSignupData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [formMessage, setFormMessage] = React.useState("");

  async function submitSignup(e) {
    e.preventDefault();
    try {
      const query = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(signupData),
        headers: {
          'Content-Type': 'application/json'
        }
      }).catch(err => {
        setFormMessage("Sorry1")
      });

      const result = await query.json();
      if (result.status === "error") {
        setFormMessage("Sorry, we couldn't sign you up. Get a life.")
      } else {
        // Dispatch email after successful response
        dispatch({ type: 'SET_EMAIL', payload: signupData.email });
        dispatch({ type: 'SET_NAME', payload: signupData.name });

        navigate("/");
      }
    } catch (err) {
      setFormMessage("Sorry, we couldn't sign you up. Get a life.")
    }
  }

  async function submitLogin(e) {
    e.preventDefault();
    try {
      const query = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await query.json()
      if (result.status === "error") {
        setFormMessage("We could not log you in with these credentials.")
      } else {
        // Dispatch email after successful response
        dispatch({ type: 'SET_EMAIL', payload: result.payload._doc.email });
        dispatch({ type: 'SET_NAME', payload: result.payload._doc.name });

        navigate("/");
      }
    } catch (err) {
      setFormMessage("We could not log you in with these credentials.")
    }
  }

  function handleSignupChange(e) {
    setFormMessage();
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  }

  function handleLoginChange(e) {
    setFormMessage();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  return (
    <div className="text-white press-start">
      <Header/>
      <div className="container flex">
        <div className="row">
          
          <div className="w-1/2 p-5 signup">
            <div>
              <form className="form" onSubmit={submitSignup}>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input type="text" className="form-control text-black" name="name" placeholder="Name" value={signupData?.name || ""} onChange={handleSignupChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input type="text" className="form-control text-black" name="email" placeholder="Email" value={signupData?.email || ""} onChange={handleSignupChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input type="password" className="form-control text-black" name="password" placeholder="Password" value={signupData?.password || ""} onChange={handleSignupChange} />
                </div>
                <button type="submit" className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 rounded hyrule">Signup</button>
              </form>
            </div>
          </div>

          <div className="w-1/2 p-5 login">
            <div>
              <form className="form" onSubmit={submitLogin}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input type="text" className="form-control text-black" name="email" placeholder="Email" value={loginData?.email || ""} onChange={handleLoginChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input type="password" className="form-control text-black" name="password" placeholder="Password" value={loginData?.password || ""} onChange={handleLoginChange} />
                </div>
                <button type="submit" className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 rounded hyrule">Login</button>
              </form>
            </div>
          </div>
        </div>

        { formMessage && formMessage.length > 0 && (
          <div className="row">
            <div className="col-12">
              { formMessage }
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

// bg-slate-600