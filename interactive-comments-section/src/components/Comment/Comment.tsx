import { useEffect } from 'react'
import { observer } from 'mobx-react-lite';

import { MetaData } from "./MetaData/MetaData";
import { Controls } from "./Controls/Controls";
import { CommentForm } from "../CommentForm/CommentForm";
import { AnswerForm } from "../AnswerForm/AnswerForm";
import { KarmaCounter } from "./KarmaCounter/KarmaCounter";
import { Replies } from "./Replies/Replies";

import { TcommentData } from "../../store/comments";
import { useAction } from "../../hooks/useAction";

import styles from "./comment.module.css";


export interface Icomment {
  data: TcommentData;
}

const Comment = ({ data }: Icomment) => {
  const { id, content, createdAt, user, score, replyingTo, replies } = data;
  const { action, setActionName, onAction } = useAction(id);

  const currentUser = localStorage.getItem("currentUser");

  const isYourComment =
    !!currentUser && user.username === JSON.parse(currentUser).username;

    useEffect(() => {
      if (action === 'delete') {
        onAction('');
      }
    }, [action, onAction]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.commentContainer}>
          <MetaData user={user} createdAt={createdAt} />
          <div className={styles.contentContainer}>
            {action === "edit" ? (
              <CommentForm onSubmit={onAction} defValue={content} sendBtn="Edit" inFocus={true} />
            ) : (
              <p className={styles.content}>
                {replyingTo ? (
                  <strong
                    className={styles.replyingTo}
                  >{`@${replyingTo} `}</strong>
                ) : null}
                {content}
              </p>
            )}
          </div>
        </div>
        <div className={styles.controlsContainer}>
          <KarmaCounter karma={score} />
          <Controls onAction={setActionName} isYourComment={isYourComment} />
        </div>
      </div>
      {action === 'reply' && (
        <AnswerForm
          onAnswer={onAction}
          inFocus={true}
        />
      )}
      {replies.length ? <Replies replies={replies} /> : null}
    </div>
  );
};

export default observer(Comment);
