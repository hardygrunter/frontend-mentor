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
  private data: TcommentData[] = data.comments;

  get getData() {
    return [...this.data];
  }

  addComment = (content: string) => {
    this.addTo(this.data, content);
  };

  addReply = (id: number, content: string) => {
    this.handleById(id, (comment) => {
      this.addTo(comment.replies, content);
    });
  };

  remove = (id: number) => {
    this.handleById(id, (comment, i, target) => {
      target.splice(i, 1);
    });
  };

  edit = (id: number, content: string) => {
    this.handleById(id, (comment) => {
      comment.content = content;
      comment.createdAt = Date.now().toString();
    });
  };

  changeScore = (id: number, score: number) => {
    this.handleById(id, (comment) => {
      comment.score = score;
    });
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

  private handleById = (
    id: number,
    handler: (
      comment: TcommentData,
      idx: number,
      target: TcommentData[]
    ) => void,
    target: TcommentData[] = this.data
  ) => {
    target.some((comment, i) => {
      if (comment.id === id) {
        handler(comment, i, target);
        return true;
      }
      this.handleById(id, handler, comment.replies);
      return false;
    });
  };

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.rootStore = root;
  }
}
