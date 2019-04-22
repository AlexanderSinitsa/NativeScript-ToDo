import { Action } from '@ngrx/store';

import { Task } from '~/app/models/task';


export const SELECT = '[Tasks] Select';
export const ADD_TASK = '[Tasks] Add Task';
export const TOGGLE_TASK_STATUS = '[Tasks] Toggle Task';
export const EDIT_DESCRIPTION = '[Tasks] Edit Task';
export const DELETE_DONE_TASKS = '[Tasks] Delete Done Task';


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

export class ToggleTaskStatus implements Action {
    readonly type = TOGGLE_TASK_STATUS;

    constructor(public payload: number) {
    }
}

export class DeleteDoneTasks implements Action {
    readonly type = DELETE_DONE_TASKS;

    constructor() {
    }
}

export class EditDescription implements Action {
    readonly type = EDIT_DESCRIPTION;

    constructor(public payload: Task) {
    }
}

export type Action = AddTask
    | Select
    | ToggleTaskStatus
    | EditDescription
    | DeleteDoneTasks;
