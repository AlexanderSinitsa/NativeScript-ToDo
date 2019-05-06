import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer, } from '@ngrx/store';

import * as fromTasks from './tasks';

export interface State {
    tasks: fromTasks.State;
}

export const reducers: ActionReducerMap<State> = {
    tasks: fromTasks.reducer
};


// logger
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('action', action);
        console.log('state', state);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = [logger];
//

/**
 *  When using the createSelector and createFeatureSelector functions
 *  @ngrx/store keeps track of the latest arguments in which your selector function was invoked.
 */
export const getTaskState = createFeatureSelector<fromTasks.State>('tasks');

// export const getIds = createSelector(
//     getTaskState,
//     fromTasks.getIds,
// );

export const getEditedTaskId = createSelector(
    getTaskState,
    fromTasks.getEditedTaskId,
);

export const getTaskEntities = createSelector(
    getTaskState,
    fromTasks.getTaskEntities,
);

export const getEditedTask = createSelector(
    getTaskEntities,
    getEditedTaskId,
    (taskEntities, editedTaskId) => editedTaskId ? taskEntities[editedTaskId] : null
);

export const getSelected = createSelector(
  getTaskState,
  fromTasks.getSelected,
);

export const getAllTasks = createSelector(
    getTaskState,
    fromTasks.getTasks,
);
