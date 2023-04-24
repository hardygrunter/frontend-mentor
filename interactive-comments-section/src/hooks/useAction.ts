import { useState } from "react";
import { useStore } from "./useStore";

export type Taction = "reply" | "edit" | "delete";

export const useAction = (id: number) => {
  const { addReply, edit, remove } = useStore("comments");
  const [action, setAction] = useState<Taction | "">();

  const setActionName = (name: Taction) => {
    setAction(name);
  };

  const onAction = (content: string) => {

    switch (action) {
      case "reply":
        addReply(id, content);
        break;
      case "edit":
        edit(id, content);
        break;
      case "delete":        
        remove(id);
        break;
      default:
        throw new Error(`There is no handler for ${action} action`);
    }
    setAction("");
  };

  return {
    action,
    setActionName,
    onAction,
  };
};
