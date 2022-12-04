import {Comment} from "./comment.model";

export class Caff {
  id: string;
  title: string;
  price: number;
  description: string;
  gifRef: string;
  comments: Comment[] = [];
}
