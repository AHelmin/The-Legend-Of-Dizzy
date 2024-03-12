import styles from './styles.module.css'
import { useDispatch } from 'react-redux';

export default function ShooterEnd({ score }) {
    const dispatch = useDispatch()
    const changeStage2 = () => {
        dispatch({ type: 'SET_STAGENAME', payload: 'stage2'})
    }
    return (
        //   <div className={styles.main}>
        <div>
            <h1 className={styles.h1}>Congratulations! You scored {score} points!
                You hit the target {score / 5} times!</h1>
            <button className={styles.nextButton} onClick={changeStage2}>
                Next Game
            </button>
        </div>
    );
};