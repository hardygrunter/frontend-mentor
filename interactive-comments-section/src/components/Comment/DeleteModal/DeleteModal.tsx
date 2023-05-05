import styles from './deleteModal.module.css';

interface IdeleteModalProps {
  onDelete: () => void;
  onCancel: () => void;
}

export const DeleteModal = ({ onDelete, onCancel }: IdeleteModalProps) => {

  return (
    <div className={styles.container}>
      <h4 className={styles.heading}>Delete comment</h4>
      <p className={styles.text}>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
      <div className={styles.controls}>
        <button className={styles.btn} onClick={onCancel}>No, Cancel</button>
        <button className={styles.btnDelete} onClick={onDelete}>Yes, Delete</button>
      </div>
    </div>
  )
}
