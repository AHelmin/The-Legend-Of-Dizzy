import React from 'react';
import Header from '../components/Header';
import zeldadog from '../assets/images/zeldadog.jpg';

const Home = () => {
  return (
    <div>
      <Header />

      <div className="text-center mt-8">
        <img
          src={zeldadog}
          alt="Centered Image"
          className="mx-auto rounded-lg"
        />

        <div className="mt-4">
          <h1 className="text-4xl font-bold">Welcome to The Legend of Dizzy</h1>
          <p className="text-lg mt-2">
            Explore a world of adventure and challenges in this legendary game.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

