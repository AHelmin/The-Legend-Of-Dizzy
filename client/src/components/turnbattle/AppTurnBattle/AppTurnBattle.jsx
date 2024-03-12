import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { Battle, EndMenu, StartMenu } from '../../turnbattle';

export const AppTurnBattle = (props) => {
  const [winner, setWinner] = useState();
  const [battleScore, setBattleScore] = useState();
  const [mode, setMode] = useState('start');


  var music = new Audio();
    music.volume = 0.1;
    music.loop = true;
    music.src = "/battle-theme.mp3";

  useEffect(() => {
    if (mode === 'battle') {
      setWinner(undefined);
    }
    // if (mode !== 'battle') {
    //   console.log("not battle")
    //   music.pause();
    // }
  }, [mode]);

  useEffect(() => {
    if (winner) {
      // music.load()
    }
  }, [winner]);

  useEffect(() => {
  window.onload = function () {
    // play the music
    // music.play();

  }
}, []);

  return (
    <div className={styles.main}>
      {mode === 'start' && (
        <StartMenu onStartClick={() => setMode('battle')} />
      )}

      {mode === 'battle' && (
        <Battle
        
          onGameEnd={winner => {
            setWinner(winner);
            setMode('gameOver');
          }}
        />
      )}

      {mode === 'gameOver' && !!winner && (
        <EndMenu winner={winner} onStartClick={() => props.setStageName('game1')} />
      )}
    </div>
  );
};
