import { Action } from '@ngrx/store';

import { Task } from '~/app/models/task';


export const SELECT = '[Tasks] Select';
export const ADD_TASK = '[Tasks] Add Task';


export class Select implements Action {
  readonly type = SELECT;
  constructor(public payload: number) { }
}


export class AddTask implements Action {
  readonly type = ADD_TASK;
  constructor(public payload: string) {
      console.log('Action add new');
  }
}


export type Action = AddTask | Select;
