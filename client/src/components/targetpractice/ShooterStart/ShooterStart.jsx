import styles from './styles.module.css';
import { useTypedMessage } from '../../../hooks/useTypedMessage'
import katyArchery from '../../../assets/images/sprites/katy_archery.jpg'

export default function StartMenu({ onStartClick }) {
  return (
    <>
      <div className="container mx-auto mt-4">
        <p className="mt-2 press-start small-text text-white text-center">
          {useTypedMessage(`Gary, now infuriated with his loss, reminds Katy of his many years of experience with coding. So Katy challenges Gary, reminding him that while he may have more experience with coding, she can still outshine him.`)}
        </p>
        <div className="flex justify-center mt-2">
          <img
            src={katyArchery}
            alt="Image of Katy shooting bow"
          />
        </div>
        <p className="mt-4 press-start small-text text-white text-center">
          Katy decides to show off her archery skills!
        </p>
        <div className={styles.main}>
          <button className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 mt-4 rounded hyrule" onClick={onStartClick}>
            Start Shooting!
          </button>
        </div>
        <p className="mt-4 press-start small-text text-white text-center">
          (To move, use the left and right arrows or the a and d keys. <br />To jump press the space bar. To shoot click the mouse, remember waiting to click the mouse lowers your accuracy! Hit the target as many times as possible.)
        </p>
      </div>
    </>
  );
};