import styles from './styles.module.css';

export default function StartMenu({ onStartClick }) {
  return (
    <div className={styles.main}>
      <button className="bg-green-800 hover:bg-green-700 text-yellow-400 font-bold py-2 px-4 rounded hyrule" onClick={onStartClick}>
        Start Game
      </button>
    </div>
  );
};