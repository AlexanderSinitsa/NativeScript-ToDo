import { Action } from '@ngrx/store';


export const SELECT = '[Tasks] Select';
export const ADD_TASK = '[Tasks] Add Task';
export const TOGGLE_TASK_STATUS = '[Tasks]  Task';

export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload: number) {
    }
}

export class AddTask implements Action {
    readonly type = ADD_TASK;

    constructor(public payload: string) {
    }
}

export class toggleTaskStatus implements Action {
    readonly type = TOGGLE_TASK_STATUS;

    constructor(public payload: number) {
    }
}

export type Action = AddTask | Select | toggleTaskStatus;
