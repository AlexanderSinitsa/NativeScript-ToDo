import { Task } from '~/app/models/task';

import * as taskAction from '~/app/store/actions/tasks';


export interface State {
    ids: number[];
    tasks: { [id: number]: Task };
    selected: number;
}

export const initialState: State = {
    ids: [1, 2, 3],
    tasks: {
        1: {
            id: 1,
            executed: false,
            description: 'Say "Hi!"'
        },
        2: {
            id: 2,
            executed: false,
            description: 'Say "Good."'
        },
        3: {
            id: 3,
            executed: false,
            description: 'Say "Bye!"'
        }
    },
    selected: null
};

export function reducer(state = initialState, action: taskAction.Action) {
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

        default:
            return state;
    }
}

class NewTask {
    id: number;
    description: string;
    executed: boolean;
    constructor(ids, description) {
        this.description = description;
        this.id = this.getMinAvailableId(ids);
        this.executed = false;
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


export const getIds = (state: State) => state.ids;
export const getTasks = (state: State) => state.tasks;
export const getSelected = (state: State) => state.selected;
