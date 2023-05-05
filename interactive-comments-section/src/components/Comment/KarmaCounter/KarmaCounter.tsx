import styles from './karmaCounter.module.css';

import Icon, { Enames } from '../../Icon/Icon';

interface IkarmaCounter {
  score: number;
  onPlus: () => void;
  onMinus: () => void;
}

export const KarmaCounter = ({ score, onPlus, onMinus }: IkarmaCounter) => {

  return (
    <div className={styles.karmaCounter}>
    <button className={styles.up} onClick={onPlus} >
      <Icon name={Enames.plus} />
    </button>
    <span className={styles.karma}>{score}</span>
    <button className={styles.down} onClick={onMinus} >
      <Icon name={Enames.minus} />
    </button>
  </div>
  )
}
