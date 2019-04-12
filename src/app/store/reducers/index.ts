import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
} from '@ngrx/store';

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
        console.log('state', state);
        console.log('action', action);
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

export const getIds = createSelector(
    getTaskState,
    fromTasks.getIds,
);

export const getTasks = createSelector(
    getTaskState,
    fromTasks.getTasks,
);

export const getSelected = createSelector(
  getTaskState,
  fromTasks.getSelected,
);

// export const getSelectedTask = createSelector(
//   getSelected,
//   getTasks,
//   (selectedId, tasks) => {
//       return {
//           ...tasks[selectedId]
//       };
//   }
// );
//
export const getAllTasks = createSelector(
    getIds,
    getTasks,
    (ids, tasks) => {
        return ids.map(id => tasks[id]);
    }
);
