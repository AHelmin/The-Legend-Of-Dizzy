import styles from './styles.module.css';
import { useDispatch } from 'react-redux';


export const EndMenu = ({ winner }) => {
  const dispatch = useDispatch();

  const changeStage3 = () => {
    dispatch({ type: 'SET_STAGENAME', payload: "stage3" });

  };

  return (
    <div className={styles.main}>
      <h1>{winner.name} has won!</h1>
      <button className={styles.startButton} onClick={changeStage3}
      >
        Next Game
      </button>
    </div>
  );
};
