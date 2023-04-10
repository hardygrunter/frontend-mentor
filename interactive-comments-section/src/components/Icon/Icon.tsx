import * as icons from '../icons';
import styles from './icon.module.css';


export enum Enames {
  delete = 'Delete',
  edit = 'Edit',
  minus = 'Minus',
  plus = 'Plus',
  reply = 'Reply',
};

interface IiconProps {
  name: Enames;
}


const Icon = ({ name }: IiconProps) => {
  return (
    <span className={styles.icon}>{icons[`${name}Icon`]()}</span>
  )
}

export default Icon