import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import katyRunning from "../../../assets/images/sprites/katy-running.png"
import { useTypedMessage } from '../../../hooks';


export const EndMenu = ({ winner }) => {
  const dispatch = useDispatch();

  const changeStage3 = () => {
    dispatch({ type: 'SET_STAGENAME', payload: "stage3" });

  };

  return (
    <div className={styles.main}>
       <p className="big-text mt-2 press-start text-white text-center">
          {useTypedMessage("With Gary defeated Katy can hear Dizzy barking!!!  There's no stopping our Hero at this point so she runs shouting I'M COMING DIZZY!!!!.....")}
          </p>
          <img
          src={katyRunning}
          alt="Image of Katy running"
        />
      <button className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 rounded hyrule" onClick={changeStage3}
      >
      FIND DIZZY!!!
      </button>
    </div>
  );
};
