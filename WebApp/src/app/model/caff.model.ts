import {Comment} from "./comment.model";

export class Caff {
  id: string;
  name: string;
  price: number;
  description: string;
  gifUrl: string;
  comments: Comment[] = [];
}
