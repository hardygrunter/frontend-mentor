import { useContext } from "react";
import { storeContext } from "../contexts/storeContext";
import { RootStore } from "../store";

export const useStore = <K extends keyof RootStore>(name: K) => {
  const store = useContext(storeContext);

  if (store) {
    return store[name];
  } else {
    throw new Error("Store not found");
  }
};
