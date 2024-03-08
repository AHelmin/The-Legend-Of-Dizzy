import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';


const UserHighScore = () => {
  const [userHighScores, setUserHighScores] = useState(null);

  useEffect(() => {
    
    const token = Cookies.get('auth_cookie');

    if (token) {
      // Decode the token to get the user ID
      try {
        const decodedToken = jwt.verify(token, JWT_SECRET); 
        const userId = decodedToken._id; //is this right??????

        // Fetch user data based on the user ID
        fetch(`/api/user/${userId}`)
          .then(response => response.json())
          .then(userData => {
            setUserHighScores(userData.highscores);
          })
          .catch(error => console.error('Error fetching user data:', error));
      } catch (error) {
        console.error('Error decoding the token:', error);
      }
    }
  }, []);

  // Render nothing if there are no high scores or no cookie
  if (!userHighScores) {
    return null;
  }

  return (
    <div>
      <h2>User High Scores</h2>
      <ul>
        {userHighScores.map((score, index) => (
          <li key={index}>{score}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserHighScore;