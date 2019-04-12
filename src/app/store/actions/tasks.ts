import { Action } from '@ngrx/store';

import { Task } from '~/app/models/task';


export const SELECT = '[Tasks] Select';
export const ADD_ONE = '[Tasks] Add Task';


export class Select implements Action {
  readonly type = SELECT;
  constructor(public payload: number) { }
}


export class AddOne implements Action {
  readonly type = ADD_ONE;
  constructor(public payload: Task) { }
}


export type Action = AddOne | Select;
