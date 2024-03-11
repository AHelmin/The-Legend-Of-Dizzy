import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../output.css';
import '../assets/css/header.css'
import {useTypedMessage} from '../hooks'
import { useSelector } from 'react-redux';



const Contact = () => {

  const userEmail = useSelector((state) => state.email);
  console.log(userEmail)
  const [ message, setMessage ] = useState({ email: userEmail, message: '' })

  const submitMessage = () => {

  }

  const handleMessageChange = (e) => {
    setMessage( { ...message, [e.target.name]: e.target.value})
  }

  return (
   
    <div className="text-white press-start">
    <Header/>
    <div className="container flex">
      <div className="row">
        <div className="w-1/2 p-5 message">
          <div>
            <form className="form" onSubmit={submitMessage}>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">Email</label>
                <input type="text" className="form-control text-black" name="email" placeholder="Email" value={message?.email || ""} onChange={handleMessageChange} />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">Message</label>
                <textarea type="text" className="form-control text-black" name="message" placeholder="Message" value={message?.message || ""} onChange={handleMessageChange} />
              </div>
              <button type="submit" className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 rounded hyrule">Login</button>
            </form>
          </div>
        </div>
      </div>
{/* 
      { formMessage && formMessage.length > 0 && (
        <div className="row">
          <div className="col-12">
            { formMessage }
          </div>
        </div> */}
      )
    </div>

  </div>
  );
};

export default Contact;

/*
What this needs:

A model for messages, simply email (pulled from state) and a message block

Needs controller for Get all and post

Needs routs for those too

Needs a button at the bottom redirecting to Home



*/