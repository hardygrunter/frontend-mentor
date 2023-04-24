import Comment from "../Comment";

import styles from './replies.module.css';
import { TcommentData } from "../../../store/comments";

type Treplies = {
  replies: TcommentData[]
};

export const Replies = ({ replies }: Treplies) => {
  return (
    <div className={styles.container}>
      {replies.map(reply => <Comment key={reply.id} data={reply} />)}
    </div>
  );
};
