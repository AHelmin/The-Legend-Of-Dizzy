import styles from './styles.module.css'

export default function ShooterEnd({ score, onStartClick }) {
    return (
        //   <div className={styles.main}>
        <div>
            <h1 className={styles.h1}>Congratulations! You scored {score} points!
                You hit the target {score / 5} times!</h1>
            {/* <button className={styles.startButton} onClick={onStartClick}> */}
            <button>
                Play Again
            </button>
        </div>
    );
};