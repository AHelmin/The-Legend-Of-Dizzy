import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../output.css';
import '../assets/css/header.css';
import {useTypedMessage} from '../hooks'
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import katyDizzy from "../assets/images/sprites/katy-dizzy.png"



export const GameOver = () => {
  const dispatch = useDispatch()
  const changeStageStart = () => {
      dispatch({ type: 'SET_STAGENAME', payload: 'start'})
  }
  

  const userEmail = useSelector((state) => state.email);
  const userName = useSelector((state) => state.name);

  const battleScore = useSelector((state) => state.battlescore);
  const rpgScore = useSelector((state) => state.rpgscore);
  const shooterScore = useSelector((state) => state.shooterScore);
  const userFinalScore = battleScore + rpgScore + shooterScore

  
  //use effect that posts to HighScores DB
  useEffect(() => {
    const postData = {
      score: userFinalScore,
      name: userName,
      email: userEmail
      
    };

    fetch('/api/highscores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response if needed
        console.log('Highscore posted successfully:', data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error posting highscore:', error);
      }
      );
  }, []);
  
    return (
      <div>
        <p className="big-text mt-2 press-start text-white text-center">
          {useTypedMessage('Success!!  Katy and Dizzy are reunited!!!!!')}
          </p>
          <img
          src={katyDizzy}
          alt="Image of Katy and Dizzy reunited"
          className="mx-auto h-auto max-w-md"
        />
          <p className="very-big-text mt-2 press-start text-red-700 text-center">
          {useTypedMessage('GAME OVER!!!!')}
          </p>
          <p className="hyrule text-yellow-400 very-big-text text-center">{userName}'s Final Score is {userFinalScore}</p>
          
          
          
          <div className="mt-4 flex justify-center">
  <div className="mx-4">
    <Link to="/home">
      <button className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 rounded hyrule" onClick={changeStageStart}>Home</button>
    </Link>
  </div>
  <div className="mx-4">
    <Link to="/contact">
      <button className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 rounded hyrule" onClick={changeStageStart}>Contact Us</button>
    </Link>
  </div>
</div>

      </div>
    );
  };

