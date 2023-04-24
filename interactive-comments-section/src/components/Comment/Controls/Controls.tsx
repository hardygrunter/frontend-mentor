import Icon, { Enames } from "../../Icon/Icon";
import { Taction } from "../../../hooks/useAction";

import styles from "./controls.module.css";

interface Icontrols {
  onAction: (action: Taction) => void;
  isYourComment: boolean
}

export const Controls = ({ onAction, isYourComment = false }: Icontrols) => {

  return (
    <div className={styles.controls}>
      {isYourComment ? (
        <>
          <button className={styles.btnRed} onClick={() => onAction('delete')}>
            <Icon name={Enames.delete} />
            Delete
          </button>
          <button className={styles.btn} onClick={() => onAction('edit')}>
            <Icon name={Enames.edit} />
            Edit
          </button>
        </>
      ) : (
        <button className={styles.btn} onClick={() => onAction('reply')}>
          <Icon name={Enames.reply} />
          Reply
        </button>
      )}
    </div>
  );
};
