import Comment from "../../Comment/Comment";
import { TcommentData } from "../../../store/comments";

import styles from "./commentsList.module.css";

interface IcommentsListProps {
  list: TcommentData[];
  depth?: number;
}

let listId: number = 0;

const CommentsList = ({ list, depth = 0 }: IcommentsListProps) => {
  const nested = depth > 0 ? ` ${styles.nested} ${getClassByDepth(depth)}` : "";

  return (
    <div className={`${styles.container}${nested}`} id={`list-${listId}`}>
      {list.map((comment, i) => (
        <Comment
          key={comment.id}
          data={comment}
          prevId={list[i - 1]?.id}
          listId={listId++}
          depth={depth}
        />
      ))}
    </div>
  );
};

export default CommentsList;

function getClassByDepth(depth: number) {
  if (depth > 3) {
    return styles["dd"];
  }

  return styles[`d-${depth}`];
}
