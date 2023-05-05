import { useStore } from "../../hooks/useStore";
import Layout from "../Layout/Layout";
import Comments from "../Comments/Comments";
import { AnswerForm } from "../AnswerForm/AnswerForm";

const App = () => {
  const comments = useStore("comments");

  const onAnswer = (answer: string) => {
    comments.addComment(answer);
  };

  return (
    <Layout>
      <Comments/>
      <AnswerForm onAnswer={onAnswer} sendBtn="Send" />
    </Layout>
  );
};

export default App;
