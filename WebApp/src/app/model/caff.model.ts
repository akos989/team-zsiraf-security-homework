import {Comment} from "./comment.model";

export class Caff {
  id: string;
  title: string;
  price: number;
  description: string;
  caffRef: string;
  comments: Comment[] = [];
}
