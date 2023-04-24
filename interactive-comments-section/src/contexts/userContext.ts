import { createContext } from "react";

export interface IuserData {
  username: string;
  image: {
    png: string;
    webp: string;
  };
}

export const userContext = createContext<IuserData>({
  username: "",
  image: {
    webp: "",
    png: "",
  },
});
