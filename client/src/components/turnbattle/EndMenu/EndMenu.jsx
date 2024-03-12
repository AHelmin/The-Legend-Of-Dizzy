import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import katyRunning from "../../../assets/images/sprites/katy-running.png"
import { useTypedMessage } from '../../../hooks';
import "../../../assets/css/header.css"


export const EndMenu = ({ winner }) => {
  const dispatch = useDispatch();

  const changeStage3 = () => {
    dispatch({ type: 'SET_STAGENAME', payload: "stage3" });

  };

  return (
    <>
      <div className="container mx-auto">
        <p className="big-text mt-2 press-start text-white text-center">With Gary defeated Katy can hear Dizzy barking!!!</p>
        <div className="flex justify-center">
          <img
            src={katyRunning}
            alt="Image of Katy running"
            className='katy-run' />
          </div>
            <p className="big-text mt-2 press-start text-red-800 text-center">
              {useTypedMessage("I'M COMING DIZZY!!!!!!!!!!!")}</p>
            <div className="flex justify-center">
              <button className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 rounded hyrule" onClick={changeStage3}>FIND DIZZY!!!</button>
            </div>
          </div>
        </>
        );
};
