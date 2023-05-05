import { CommentForm } from "../Comment/CommentForm/CommentForm";

import styles from "./answerForm.module.css";

interface IanswerForm {
  onAnswer: (content: string) => void;
  defValue?: string;
  inFocus?: boolean;
  sendBtn?: string;
}

export const AnswerForm = ({
  onAnswer,
  sendBtn = "Reply",
  defValue = "",
  inFocus,
}: IanswerForm) => {
  let user;
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    user = JSON.parse(currentUser);
  }

  return (
    <div className={styles.container}>
      <picture>
        <source srcSet={user?.image?.webp} type="image/webp" />
        <img src={user?.image?.png} className={styles.avatar} alt="avatar" />
      </picture>
      <CommentForm
        onSubmit={onAnswer}
        defValue={defValue}
        sendBtn={sendBtn}
        inFocus={inFocus}
      />
    </div>
  );
};
