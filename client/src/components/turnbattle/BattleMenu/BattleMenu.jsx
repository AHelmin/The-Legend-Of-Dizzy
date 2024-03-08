import styles from './styles.module.css';

export const BattleMenu = ({ onAttack, onMagic, onHeal }) => (
  <div className={styles.main}>
    <div onClick={onAttack} className={styles.option}>
    Concatenate!!!
    </div>
    <div onClick={onMagic} className={styles.option}>
      Fix Syntax
    </div>
    <div onClick={onHeal} className={styles.option}>
      Drink Starbucks
    </div>
  </div>
);
