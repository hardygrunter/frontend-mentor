import Layout from "../Layout/Layout";
import { AnswerForm } from "../AnswerForm/AnswerForm";

import data from "./data.json";
import { userContext } from "../../contexts/userContext";
import CommentsList from "../CommentsList/CommentsList";
import { storeContext } from "../../contexts/storeContext";

import store from '../../store';
store.currentUser.load();

const App = () => {
  const onAnswer = (answer: string) => {
    store.comments.addComment(answer);
  };

  return (
    <Layout>
      <userContext.Provider value={data.currentUser}>
        <storeContext.Provider value={store} >
        <CommentsList />
        <AnswerForm onAnswer={onAnswer} sendBtn="Send" />
        </storeContext.Provider>
      </userContext.Provider>
    </Layout>
  );
};

export default App;
