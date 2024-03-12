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
        const userScores = data.payload.filter(item => item.email === userEmail);
        const sortedUserTopScores = userScores.sort((a, b) => b.score - a.score);
        const userTopScoresArray = sortedUserTopScores.slice(0, 5).map(item => item.score);
        setUserTopScores(userTopScoresArray);

        // Extract globalTopScores
        const sortedGlobalScores = data.payload.sort((a, b) => b.score - a.score);
        const topGlobalScores = sortedGlobalScores.slice(0, 5);
        setGlobalTopScores(topGlobalScores);
      } catch (error) {
        console.error('Error fetching high scores:', error);
      }
    };
    fetchData();
  }, [userEmail]); 

  return (
    <div>
      {userTopScores.length > 0 && (
        <div className="text-center">
          <h2 className="text-4xl font-bold hyrule text-yellow-600">{userName}'s TOP SCORES</h2>
          <ul className="press-start text-white text-lg">
            {userTopScores.map((score, index) => (
              <li key={index}>{score}</li>
            ))}
          </ul>
        </div>
      )}

      {globalTopScores.length > 0 && (
        <div  className="text-center">
          <h2 className="text-4xl font-bold hyrule text-yellow-600">LEADERBOARD</h2>
          <ul>
            {globalTopScores.map((item, index) => (
              <li  className="press-start text-white text-lg" key={index}>
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
