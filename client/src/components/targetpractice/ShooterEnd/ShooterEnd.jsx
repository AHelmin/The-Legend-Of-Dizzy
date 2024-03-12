import styles from './styles.module.css'
import { useDispatch } from 'react-redux';

export default function ShooterEnd({ score }) {
    const dispatch = useDispatch()
    const changeStage2 = () => {
        dispatch({ type: 'SET_STAGENAME', payload: 'stage2' })
    }
    return (
        //   <div className={styles.main}>
        <>
            <h1 className={styles.h1}>Congratulations! You scored {score} points!
                You hit the target {score / 5} times!</h1>
            <div className={styles.main}>

                <button className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 rounded hyrule" onClick={changeStage2}>
                    Next Game
                </button>
            </div>
        </>
    );
};