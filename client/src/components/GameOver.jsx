import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../output.css';
import '../assets/css/header.css';
import {useTypedMessage} from '../hooks'
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import { Link } from 'react-router-dom';



export const GameOver = () => {

  

  const userEmail = useSelector((state) => state.email);
  const userName = useSelector((state) => state.name);

  const battleScore = useSelector((state) => state.battlescore);
  const rpgScore = useSelector((state) => state.rpgscore);
  const arrowScore = useSelector((state) => state.arrowScore);
  const userFinalScore = battleScore+rpgScore+arrowScore
  
  //use effect that posts to HighScores DB
  useEffect(() => {
    const postData = {
      name: userName,
      email: userEmail,
      score: userFinalScore
    };

    fetch('/api/highscores/', {
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
      });
  }, []);
  
    return (
      <div>
        <p className="text-lg mt-2 press-start text-white">
          {useTypedMessage('Success!!  Katy and Dizzy are reunited.  GAME OVER!!!')}
          </p>
          <div className="mt-4">
        <Link to="/home">
          <button className="btn btn-primary mr-2">Home</button>
        </Link>
        <Link to="/contact">
          <button className="btn btn-primary">Contact Us</button>
        </Link>
      </div>

      </div>
    );
  };

  /*
What this needs to do top to bottom:

- Display finishing message


- Provide button that links to a contact page

- Provide a button to go Home

  */