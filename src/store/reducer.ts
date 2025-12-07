import { combineReducers } from '@reduxjs/toolkit';
import {dataProcess} from './data-process/data-process.ts';
import {userProcess} from './user-process/user-process.ts';

export const reducer = combineReducers({
  data: dataProcess,
  user: userProcess,
});
