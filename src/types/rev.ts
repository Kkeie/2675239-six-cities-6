import {userRev} from './userRev.ts';

export type Rev = {
  id: string;
  date: string;
  user: userRev;
  comment: string;
  rating: number;
}
