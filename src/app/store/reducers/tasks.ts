import * as appSettings from 'tns-core-modules/application-settings';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { ITask } from '~/app/models/task';
import * as taskAction from '~/app/store/actions/tasks';


export interface State extends EntityState<ITask> {
    // additional entities state properties
    selected: string | null;
    editedTaskId: string | null;
}

// export function selectTaskId(a: ITask): string {
//     // In this case this would be optional since primary key is id
//     return String(a.id);
// }
export const adapter: EntityAdapter<ITask> = createEntityAdapter<ITask>({
    // selectId: selectTaskId,
    sortComparer: false, // a sorting function or false
});

// export const initialState: State = adapter.getInitialState({
//     // additional entity state properties
//     selected: null,
// });

export function reducer(state = getInitialState(), action: taskAction.Action) {
    switch (action.type) {
        case taskAction.ADD_TASK: {
            return adapter.addOne(action.payload, state);
        }

        case taskAction.SELECT: {
            const id = action.payload;
            return {
                ...state,
                selected: id
            };
        }

        case taskAction.START_EDITING: {
            const id = action.payload;
            return {
                ...state,
                editedTaskId: id
            };
        }

        case taskAction.TOGGLE_TASK_STATUS: {
            return adapter.updateOne(action.payload, state)
        }

        case taskAction.EDIT_DESCRIPTION: {
            return adapter.updateOne(action.payload, state)
        }

        case taskAction.FINISH_EDITING: {
            return {...state, editedTaskId: null};
        }


        case taskAction.DELETE_DONE_TASKS: {
            const doneTaskIds = (getIds(state) as number[])
                .filter(id => state.entities[id].done === true);
            return adapter.removeMany(doneTaskIds, state);
        }

        default:
            return state;
    }
}

function getInitialState(): State {
    let stateBackup;
    try {
        stateBackup = JSON.parse(appSettings.getString("state"));
    } catch {
        console.log(stateBackup, '<======= appSettings has no data');
    }
    // if the AppSetting store has no data, we return the default state
    return stateBackup ? stateBackup : {
        ids: ['1', '2', '3'],
        entities: {
            '1': {
                id: '1',
                done: false,
                description: 'Say "Hi!"'
            },
            '2': {
                id: '2',
                done: false,
                description: 'Say "Good."'
            },
            '3': {
                id: '3',
                done: false,
                description: 'Say "Bye!"'
            }
        },
        selected: null,
        editedTaskId: null
    };
}

// get the selectors
const {
    selectIds,      // select the array of task ids
    selectEntities, // select the dictionary of task entities
    selectAll,      // select the array of tasks
    selectTotal,    // select the total task count
} = adapter.getSelectors();

export const getIds = selectIds;
export const getTasks = selectAll;
export const getTaskEntities = selectEntities;
export const getSelected = (state: State) => state.selected;
export const getEditedTaskId = (state: State) => state.editedTaskId;
