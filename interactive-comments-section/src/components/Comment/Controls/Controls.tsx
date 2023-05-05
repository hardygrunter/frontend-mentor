import Icon, { Enames } from "../../Icon/Icon";
import { Tactions } from "../../../hooks/useAction";
import { Popup } from "../../Popup/Popup";
import { DeleteModal } from "../DeleteModal/DeleteModal";

import styles from "./controls.module.css";

interface Icontrols {
  actions: Tactions;
  isYourComment: boolean;
}

export const Controls = ({ actions, isYourComment = false }: Icontrols) => {
  const onDelete = () => {
    actions.delete();
  };


  return (
    <div className={styles.controls}>
      {isYourComment ? (
        <>
          <Popup
            button={
              <button className={styles.btnRed}>
                <Icon name={Enames.delete} />
                Delete
              </button>
            }
          >
            {(handleClose) => <DeleteModal onDelete={onDelete} onCancel={handleClose} />}
          </Popup>
          <button className={styles.btn} onClick={actions.edit}>
            <Icon name={Enames.edit} />
            Edit
          </button>
        </>
      ) : (
        <button className={styles.btn} onClick={actions.reply}>
          <Icon name={Enames.reply} />
          Reply
        </button>
      )}
    </div>
  );
};
