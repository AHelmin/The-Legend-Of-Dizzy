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
      <button className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 rounded hyrule" onClick={changeStage3}
      >
        Next Game
      </button>
    </div>
  );
};
