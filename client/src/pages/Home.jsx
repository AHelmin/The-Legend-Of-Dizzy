import React from 'react';
import Header from '../components/Header';
// import UserHighScore from '../components/UserHighScore';
import zeldadog from '../assets/images/zeldadog.jpg';
import '../output.css';
import '../assets/css/header.css'
import {useTypedMessage} from '../hooks'
import Leaderboard from '../components/Leaderboard';


const Home = () => {
  return (
    <div>
      <Header />

      <div className="text-center mt-8">
        <img
          src={zeldadog}
          alt="Centered Image"
          className="mx-auto h-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0 homepage-image"
        />

        <div className="mt-4">
          <h1 className="text-4xl font-bold hyrule text-yellow-600">Welcome to The Legend of Dizzy</h1>
          <p className="text-lg mt-2 press-start text-white">
          {useTypedMessage('Explore a world of adventure and challenges in this legendary game.')}
          </p>
        </div>
      </div>
      {/* <UserHighScore/> */}
      
    </div>
  );
};

export default Home;

