import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  // const [leaderboardData, setLeaderboardData] = useState([]);

  // useEffect(() => {
  //   const fetchLeaderboard = async () => {
  //     try {
  //       const response = await fetch("/api/user");
  //       const data = await response.json();

  //       const sortedData = data.payload.sort((a, b) => b.scores[0] - a.scores[0]);
  //       const top5 = sortedData.slice(0, 5);

  //       await postHighScores(top5);
  //     } catch (error) {
  //       console.error("Error fetching leaderboard:", error);
  //     }
  //   };

  //   const postHighScores = async (top5) => {
  //     try {
  //       const highScores = top5.map(({ name, email, scores }) => ({
  //         name,
  //         email,
  //         score: scores[0],
  //       }));

  //       const response = await fetch("/api/highscores", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(highScores),
  //       });

  //       if (response.ok) {
  //         console.log("High scores posted successfully!");
  //       } else {
  //         console.error("Failed to post high scores:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error posting high scores:", error);
  //     }
  //   };

  //   fetchLeaderboard();
  // }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <div>
      {/* Render your leaderboard UI using the 'leaderboardData' state */}
    </div>
  );
};

export default Leaderboard;