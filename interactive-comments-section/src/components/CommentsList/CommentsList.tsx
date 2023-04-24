import Comment from "../Comment/Comment";
import { observer } from "mobx-react-lite";

import { useStore } from "../../hooks/useStore";
import styles from "./commentsList.module.css";

const CommentsList = () => {
   const comments = useStore('comments');

  return (
    <section className={styles.container}>
      {comments.data.map((comment) => (
        <Comment key={comment.id} data={comment} />
      ))}
    </section>
  );
};

export default observer(CommentsList);