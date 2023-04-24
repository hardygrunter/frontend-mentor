import React from 'react'
import styles from './karmaCounter.module.css';

import Icon, { Enames } from '../../Icon/Icon';

export const KarmaCounter = ({ karma }: { karma: number }) => {
  return (
    <div className={styles.karmaCounter}>
    <button className={styles.up}>
      <Icon name={Enames.plus} />
    </button>
    <span className={styles.karma}>{karma}</span>
    <button className={styles.down}>
      <Icon name={Enames.minus} />
    </button>
  </div>
  )
}
