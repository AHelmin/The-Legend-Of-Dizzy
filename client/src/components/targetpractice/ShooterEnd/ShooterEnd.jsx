
export default function ShooterEnd({ score, onStartClick }) {
    return (
    //   <div className={styles.main}>
        <div>
        <h1>Your Score is {score}!</h1>
        {/* <button className={styles.startButton} onClick={onStartClick}> */}
            <button>
          Play Again
        </button>
      </div>
    );
  };