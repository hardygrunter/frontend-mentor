import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import CommentsList from "../Comments/CommentsList/CommentsList";
import { MetaData } from "./MetaData/MetaData";
import { Controls } from "./Controls/Controls";
import { CommentForm } from "./CommentForm/CommentForm";
import { AnswerForm } from "../AnswerForm/AnswerForm";
import { KarmaCounter } from "./KarmaCounter/KarmaCounter";

import { TcommentData } from "../../store/comments";
import { Eaction, useAction } from "../../hooks/useAction";

import styles from "./comment.module.css";

export interface Icomment {
  data: TcommentData;
  prevId: number;
  listId: number;
  depth: number;
}

const Comment = ({ data, prevId, listId, depth }: Icomment) => {
  const { id, content, createdAt, user, score, replies } = data;
  const { action, actions, onAction } = useAction(id);

  const currentUser = localStorage.getItem("currentUser");

  const isYourComment =
    !!currentUser && user.username === JSON.parse(currentUser).username;

  useEffect(() => {
    switch (action) {
      case Eaction.delete:
        onAction("");
        const prev = document.getElementById(`comment-${prevId}`);
        if (prev) {
          setTimeout(() => {
            prev.focus();
          }, 50);
        } else {
          const prevList = document.getElementById(`list-${listId}`);
          setTimeout(() => {
            prevList?.focus();
          }, 50);
        }
        break;
      case Eaction.upVote:
        onAction(score + 1);
        break;
      case Eaction.downVote:
        onAction(score - 1);
        break;
    }
  }, [action, onAction]);

  return (
    <div id={`comment-${id}`} tabIndex={-1}>
      <div className={styles.container}>
        <div className={styles.commentContainer}>
          <MetaData user={user} createdAt={createdAt} />
          <div className={styles.contentContainer}>
            {action === Eaction.edit ? (
              <CommentForm
                onSubmit={onAction}
                defValue={content}
                sendBtn="Edit"
                inFocus={true}
              />
            ) : (
              <p className={styles.content}>{content}</p>
            )}
          </div>
        </div>
        <div className={styles.controlsContainer}>
          <KarmaCounter
            score={score}
            onPlus={actions.upVote}
            onMinus={actions.downVote}
          />
          <Controls actions={actions} isYourComment={isYourComment} />
        </div>
      </div>
      {action === Eaction.reply && (
        <AnswerForm onAnswer={onAction} inFocus={true} />
      )}
      {replies.length ? (
        <CommentsList list={replies} depth={depth + 1} />
      ) : null}
    </div>
  );
};

export default observer(Comment);
