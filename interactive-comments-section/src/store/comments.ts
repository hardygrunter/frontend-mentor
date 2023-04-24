import { makeAutoObservable } from "mobx";
import { IuserData } from "./currentUser";
import { RootStore } from ".";

import data from "../components/app/data.json";

export type TcommentData = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: IuserData;
  replyingTo?: string;
  replies: TcommentData[];
};

export class Comments {
  private uniId: number = 20;

  rootStore: RootStore;
  data: TcommentData[] = data.comments;

  addComment = (content: string) => {
    this.addTo(this.data, content);
  };

  addReply = (to: number, content: string) => {
    const target = this.data.find((comment) => comment.id === to);

    if (target) {
      this.addTo(target.replies, content);
    }
  };

  remove = (id: number) => {
    this.removeFrom(this.data, id);
  };

  edit = (id: number, content: string) => {
    this.editFrom(this.data, id, content);
  };

  private addTo(target: TcommentData[], content: string) {
    const comment: TcommentData = {
      content,
      score: 0,
      user: this.rootStore.currentUser.userData,
      createdAt: Date.now().toString(),
      replies: [],
      id: ++this.uniId,
    };

    target.push(comment);
  }

  private removeFrom = (target: TcommentData[], id: number) => {
    target.some((comment, i) => {
      if (comment.id === id) {
        target.splice(i, 1);
        return true;
      }
      this.removeFrom(comment.replies, id);
      return false;
    });
  };

  private editFrom = (target: TcommentData[], id: number, content: string) => {
    target.some((comment, i) => {
      if (comment.id === id) {
        comment.content = content;
        comment.createdAt = Date.now().toString();
        return true;
      }
      this.editFrom(comment.replies, id, content);
      return false;
    });
  };

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.rootStore = root;
  }
}
