import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import CommentsList from "./CommentsList/CommentsList";

const Comments = () => {
  const comments = useStore("comments");

  const orderedComments = comments.getData.sort((a, b) => b.score - a.score);

  return <CommentsList list={orderedComments} />;
};

export default observer(Comments);
