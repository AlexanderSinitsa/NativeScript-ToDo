import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ITask } from '~/app/models/task';


export const SELECT = '[Tasks] Select';
export const START_EDITING = '[Tasks] Start editing';
export const ADD_TASK = '[Tasks] Add Task';
export const TOGGLE_TASK_STATUS = '[Tasks] Toggle Task';
export const EDIT_DESCRIPTION = '[Tasks] Edit Task';
export const DELETE_DONE_TASKS = '[Tasks] Delete Done Task';


export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload: string) {
    }
}

export class StartEditing implements Action {
    readonly type = START_EDITING;

    constructor(public payload: string) {
    }
}

export class AddTask implements Action {
    readonly type = ADD_TASK;

    constructor(public payload: ITask) {
    }
}

export class ToggleTaskStatus implements Action {
    readonly type = TOGGLE_TASK_STATUS;

    constructor(public payload: Update<ITask>) {
    }
}

export class DeleteDoneTasks implements Action {
    readonly type = DELETE_DONE_TASKS;

    constructor() {
    }
}

export class EditDescription implements Action {
    readonly type = EDIT_DESCRIPTION;

    constructor(public payload: Update<ITask>) {
    }
}

export type Action = AddTask
    | Select
    | ToggleTaskStatus
    | EditDescription
    | DeleteDoneTasks
    | StartEditing;
