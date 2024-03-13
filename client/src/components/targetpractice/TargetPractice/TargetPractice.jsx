
import { useEffect, useState } from 'react';
import { ShooterStart, ShooterEnd, Shooter, Timer } from '../../targetpractice';


export default function TargetPractice() {
  const [score, setScore] = useState();
  const [mode, setMode] = useState('start');

  useEffect(() => {
    // console.log(score)
  }, [score])

  useEffect(() => {
    if (mode === 'shoot') {
      setScore(0);
    }
  }, [mode]);

  function handletimer() {
    setMode('gameOver')
  }

  return (
    // <div className={styles.main}>
    <div>
      {mode === 'start' && (
        <ShooterStart onStartClick={() => setMode('shoot')} />
      )}

      {mode === 'shoot' && (
        <>
    <div className="flex justify-center">
          <Shooter
            onScoreUpdate={shootingScore => {
              setScore(shootingScore);
            }}
          />
          </div>
          <Timer duration={45} onEnd={handletimer} />
          
        </>
      )}

      {mode === 'gameOver' && (
        <ShooterEnd score={score} onStartClick={() => setMode('battle')} />
      )}
    </div>
  );
};
