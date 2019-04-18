import { Task } from '~/app/models/task';

import * as taskAction from '~/app/store/actions/tasks';
import * as appSettings from 'tns-core-modules/application-settings';


export interface State {
    ids: number[];
    tasks: { [id: number]: Task };
    selected: number;
}

export function reducer(state = getInitialState(), action: taskAction.Action) {
    switch (action.type) {
        case taskAction.ADD_TASK: {
            const description: string = action.payload;
            const newTask: Task = new NewTask(state.ids, description);
            return {
                ...state,
                ids: [...state.ids, newTask.id],
                tasks: {...state.tasks, [newTask.id]: newTask}
            };
        }

        case taskAction.SELECT: {
            const id = action.payload;
            return {
                ...state,
                selected: id
            };
        }

        case taskAction.TOGGLE_TASK_STATUS: {
            const id = action.payload;
            const currentStatus = state.tasks[id].done;
            return {
                ...state, tasks: {
                    ...state.tasks, [id]: {
                        ...state.tasks[id], done: !currentStatus
                    }
                }
            }
        }

        default:
            return state;
    }
}

class NewTask {
    id: number;
    description: string;
    done: boolean;

    constructor(ids, description) {
        this.description = description;
        this.id = this.getMinAvailableId(ids);
        this.done = false;
    }

    private getMinAvailableId = (ids: number[]): number => {
        const sortedIds = ids.sort();
        console.log(sortedIds);
        ids.forEach((id, i) => {
            if (id !== i) {
                return i;
            }
        });
        return ids.length + 1;
    };
}

function getInitialState(): State {
    let stateBackup;
    try {
        stateBackup = JSON.parse(appSettings.getString("state"));
    } finally {
    }
    return stateBackup ? stateBackup : {
        ids: [1, 2, 3],
        tasks: {
            1: {
                id: 1,
                done: false,
                description: 'Say "Hi!!!"'
            },
            2: {
                id: 2,
                done: false,
                description: 'Say "Good."'
            },
            3: {
                id: 3,
                done: false,
                description: 'Say "Bye!"'
            }
        },
        selected: null
    };
}

export const getIds = (state: State) => state.ids;
export const getTasks = (state: State) => state.tasks;
export const getSelected = (state: State) => state.selected;
