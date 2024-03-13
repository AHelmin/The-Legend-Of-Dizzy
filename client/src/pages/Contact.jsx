import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../output.css';
import '../assets/css/header.css'
import { useTypedMessage } from '../hooks'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'



const Contact = () => {

  const userEmail = useSelector((state) => state.email);
  console.log(userEmail)
  const [message, setMessage] = useState({ email: userEmail, message: '' })
  const [formMessage, setFormMessage] = useState("");

  const submitMessage = async (e) => {
    e.preventDefault();
    try {
      const query = await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await query.json()
      if(result.status === 'error') {
        setFormMessage('We could not process your message')
      } else {
        setFormMessage('Thank you for your message.')
        setMessage({ email: userEmail, message: ''})
      }
    } catch(err) {
      setFormMessage('Sorry, something went wrong.')
    }
  }

  const handleMessageChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value })
  }

  return (
<>
    
      <Header />
      
      <div className="container flex">
        <div className="row">
          <div className="w-1/2 p-5 message">
            <div>
            <div className="text-white press-start">
              <form className="form" onSubmit={submitMessage}>
                <div className="mb-3">
                  {/* <p>{userEmail}</p> */}
                  
                  <label className="form-label" htmlFor="email">Email</label>
                  <input type="text" className="form-control text-black" name="email" placeholder="Email" value={message?.email || ""} onChange={handleMessageChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">Message</label>
                  <textarea type="text" className="form-control text-black" name="message" placeholder="Message" value={message?.message || ""} onChange={handleMessageChange} />
                </div>
                <button type="submit" className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 rounded hyrule">Submit</button>
              </form>
            </div>
          </div>
        </div>

        {formMessage && formMessage.length > 0 && (
          <div className="row">
            <div className="col-12">
              {formMessage}
            </div>
          </div>
        )}
        <div className='w-1/2 p-5'>
        <Link to="/home">
          <button className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 rounded hyrule mx-5">Home</button>
        </Link>
        </div>
    </div>
    <p className="big-text mt-2 press-start text-white text-center">
          {useTypedMessage('Feel free to send us a message about our project!  Or click on the home button and play again!!')}
          </p>
    </div>
    </>
  );
};

export default Contact;
