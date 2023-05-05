import { useState } from "react";
import { useStore } from "./useStore";
import { enumKeys } from "../utils/enumKeys";

export enum Eaction {
  delete = "delete",
  edit = "edit",
  reply = "reply",
  upVote = "upVote",
  downVote = "downVote",
}

export type Tactions = {
  [K in Eaction]: () => void;
};

const NOOP = () => {};

export const useAction = (id: number) => {
  const { addReply, edit, remove, changeScore } = useStore("comments");
  const [action, setAction] = useState<Eaction>();

  const actions: Tactions = {
    delete: NOOP,
    edit: NOOP,
    reply: NOOP,
    upVote: NOOP,
    downVote: NOOP,
  };

  for (const act of enumKeys(Eaction)) {
    actions[act] = () => {
      setAction(Eaction[act as keyof typeof Eaction]);
    };
  }

  const onAction = (content: any) => {
    switch (action) {
      case Eaction.reply:
        addReply(id, content);
        break;
      case Eaction.edit:
        edit(id, content);
        break;
      case Eaction.delete:
        remove(id);
        break;
      case Eaction.upVote:
        changeScore(id, content);
        break;
      case Eaction.downVote:
        changeScore(id, content);
        break;
      default:
        throw new Error(`There is no handler for ${action} action`);
    }
    setAction(undefined);
  };

  return {
    action,
    actions,
    onAction,
  };
};
