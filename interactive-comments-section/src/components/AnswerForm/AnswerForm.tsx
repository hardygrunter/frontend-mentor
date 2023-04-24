import { CommentForm } from "../CommentForm/CommentForm";

import styles from "./answerForm.module.css";

interface IanswerForm {
  onAnswer: (content: string) => void;
  value?: string;
  inFocus?: boolean;
  sendBtn?: string;
}

export const AnswerForm = ({ onAnswer,sendBtn = 'Reply',  inFocus }: IanswerForm) => {
  let user;
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    user = JSON.parse(currentUser);
  }

  return (
    <div className={styles.container}>
      <picture>
        <source srcSet={user?.image?.webp} type="image/webp" />
        <img src={user?.image?.png} className={styles.avatar} alt="avatar" />
      </picture>
      <CommentForm onSubmit={onAnswer} sendBtn={sendBtn} inFocus={inFocus} />
        </div>
  );
};
