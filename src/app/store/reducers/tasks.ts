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
    // case taskAction.ADD_ONE: {
    //   const newTask: Task = action.payload;
    //   return {
    //     ...state,
    //     ids: [...state.ids, newTask.id],
    //     tasks: { ...state.tasks, newTask }
    //   };
    // }

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

export const getIds = (state: State) => state.ids;
export const getTasks = (state: State) => state.tasks;
export const getSelected = (state: State) => state.selected;
