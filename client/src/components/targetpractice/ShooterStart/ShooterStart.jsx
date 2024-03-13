import styles from './styles.module.css';
import { useTypedMessage } from '../../../hooks/useTypedMessage'
import katyArchery from '../../../assets/images/sprites/katy_archery.jpg'
import { useEffect } from 'react';

export default function StartMenu({ onStartClick }) {

  useEffect(() => {
      const audioEl = document.getElementById("music");
      audioEl.volume = 0.2;
      audioEl.loop = true;
      audioEl.currentTime = 2;
      audioEl.play();
  }, []);

  return (
    <>
      <div className="container mx-auto mt-4">
        <p className="mt-2 press-start small-text text-white text-center">
          {useTypedMessage(`Upon embarking on her journey, our hero Katy and all of her surroundings immediately turned medieval including her clothes and the background!
          She could tell she was on the right track and that Gary had been there prior because he left a pile of Jonathan Heads in his wake.`)}
        </p>
        <div className="flex justify-center mt-2">
          <img
            src={katyArchery}
            alt="Image of Katy shooting bow"
          />
        </div>
        <p className="mt-4 press-start small-text text-white text-center">
          Katy must first pass a test of her archery skill!
        </p>
        <div className={styles.main}>
          <button className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 mt-4 rounded hyrule" onClick={onStartClick}>
            Start Shooting!
          </button>
        </div>
        <p className="mt-4 press-start small-text text-white text-center">
          (To move, use the left and right arrows or the a and d keys. <br />To jump press the space bar. To shoot click the mouse, remember waiting to click the mouse lowers your accuracy! Hit the target as many times as possible.)
        </p>
      </div>
    </>
  );
};