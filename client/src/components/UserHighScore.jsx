// UserHighScore.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../output.css';
import '../assets/css/header.css';

const UserHighScore = () => {
  const userEmail = useSelector((state) => state.email);
  const [userData, setUserData] = useState({ name: '', scores: [] });

  useEffect(() => {
    const fetchUserHighScores = async () => {
      try {
        const response = await fetch(`/api/user/email/${userEmail}`);
        const data = await response.json();
        
        // Check if there are highscores in the response
        if (data.scores && data.scores.length > 0) {
          // Sort highscores in descending order
          const sortedHighscores = data.scores.sort((a, b) => b - a);
          setUserData({ name: data.name, scores: sortedHighscores });
        }
      } catch (error) {
        console.error('Error fetching user highscores:', error);
      }
    };

    if (userEmail) {
      fetchUserHighScores();
    }
  }, [userEmail]);

  return (
    <div>
      {userData.scores.length > 0 && (
        <div className="text-center mt-100">
          <h2 className="hyrule text-yellow-600">{userData.name}'s High Scores</h2>
          <ul className="press-start text-white">
            {userData.scores.map((score, index) => (
              <li key={index}>{score}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserHighScore;
