import { Comments } from "./comments";
import { CurrentUser } from "./currentUser";

export class RootStore {
  storage: Storage;
  comments: Comments;
  currentUser: CurrentUser;

  constructor() {
    this.storage = window.localStorage;

    this.comments = new Comments(this);
    this.currentUser = new CurrentUser(this);
  }
}

export default new RootStore();
