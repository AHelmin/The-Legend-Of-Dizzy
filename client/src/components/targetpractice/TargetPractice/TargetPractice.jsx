
import { useEffect, useState } from 'react';
import { ShooterStart, ShooterEnd, Shooter } from '../../targetpractice';


export default function TargetPractice() {
  const [score, setScore] = useState();
  const [mode, setMode] = useState('start');

  useEffect(() => {
    if (mode === 'shoot') {
      setScore(0);
    }
  }, [mode]);

  return (
    // <div className={styles.main}>
    <div>
      {mode === 'start' && (
        <ShooterStart onStartClick={() => setMode('shoot')} />
      )}

      {mode === 'shoot' && (
        <Shooter
          onGameEnd={score => {
            setScore(score);
            setMode('gameOver');
          }}
        />
      )}

      {mode === 'gameOver' && !!winner && (
        <ShooterEnd score={score} onStartClick={() => setMode('battle')} />
      )}
    </div>
  );
};
