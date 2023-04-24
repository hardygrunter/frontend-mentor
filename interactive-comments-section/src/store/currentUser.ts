import { makeAutoObservable } from "mobx";
import { RootStore } from ".";

export interface IuserData {
  username: string;
  image: {
    png: string;
    webp: string;
  };
}

export class CurrentUser implements IuserData {
  rootStore: RootStore;

  username = "juliusomo";
  image = {
    png: "./images/avatars/image-juliusomo.png",
    webp: "./images/avatars/image-juliusomo.webp",
  };

  get userData() {
    return {
      username: this.username,
      image: this.image,
    };
  }

  load = () => {
    const user = this.rootStore.storage.getItem('currentUser');

    if (!user) {
      this.rootStore.storage.setItem(
        "currentUser",
        JSON.stringify(this.userData)
      );
    }
  };

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.rootStore = root;
  }
}
