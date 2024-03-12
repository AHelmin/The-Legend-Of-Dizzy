import styles from './styles.module.css';
import "../../../assets/css/header.css"
import "../../../../src/output.css"

export const StartMenu = ({ onStartClick }) => {
  return (
    <div className={styles.main}>
      <button className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 rounded hyrule" onClick={onStartClick}>
        Start Game
      </button>
    </div>
  );
};
