import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../output.css';
import '../assets/css/header.css';

const UserHighScore = () => {
  const [userTopScores, setUserTopScores] = useState([]);
  const [globalTopScores, setGlobalTopScores] = useState([]);

  const userEmail = useSelector((state) => state.email);
  const userName = useSelector((state) => state.name);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/highscores');
        const data = await response.json();

        // Extract userTopScores
        const userScores = data.filter(item => item.email === userEmail);
        const userTopScoresArray = userScores.map(item => item.score);
        setUserTopScores(userTopScoresArray);

        // Extract globalTopScores
        const sortedGlobalScores = data.sort((a, b) => b.score - a.score);
        const topGlobalScores = sortedGlobalScores.slice(0, 5);
        setGlobalTopScores(topGlobalScores);
      } catch (error) {
        console.error('Error fetching high scores:', error);
      }
    };

  
    

    fetchData();
  }, []); 

  return (
    <div>
    {userTopScores.length > 0 && (
      <div>
        <h2>{userName}'s TOP SCORES</h2>
        <ul>
          {userTopScores.map((score, index) => (
            <li key={index}>{score}</li>
          ))}
        </ul>
      </div>
    )}

    {globalTopScores.length > 0 && (
      <div>
        <h2>LEADERBOARD</h2>
        <ul>
          {globalTopScores.map((item, index) => (
            <li key={index}>
              {item.name}: {item.score}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
};

export default UserHighScore;
