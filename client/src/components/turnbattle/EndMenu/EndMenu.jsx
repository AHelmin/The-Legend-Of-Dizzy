import styles from './styles.module.css';
import { useDispatch } from 'react-redux';


export const EndMenu = ({ winner }) => {
  const dispatch = useDispatch();

  const changeStage1 = () => {
    dispatch({ type: 'SET_STAGENAME', payload: "stage1" });

  };

  return (
    <div className={styles.main}>
      <h1>{winner.name} has won!</h1>
      <button className={styles.startButton} onClick={changeStage1}
      >
        Next Game
      </button>
    </div>
  );
};
