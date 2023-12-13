import { createSlice } from '@reduxjs/toolkit';
import { has } from 'lodash';

import type { PayloadAction } from '@reduxjs/toolkit'
import { TaskCardConfig } from '../types';

export type TaskCardsState = {
  listCards: Record<string, Array<TaskCardConfig>>
};

type CardRef = {
  listId: string | number,
  fromListId: string | number,
  cardId: string | number
};

type ListRef = {
  name: string
};

const initialState: TaskCardsState = {
  listCards: {
    todos: [],
    in_progress: [],
    done: [],
    deleted: []
  }
};

const reducers = {
  createTask: (state: TaskCardsState) => {

  },
  transferTask: (state: TaskCardsState, action: PayloadAction<CardRef>) => {
    const payload = { ...action.payload };
    const currState = { ...state };

    if (currState.listCards[payload.fromListId].length) {
      let targetTaskIndex = 0;

      currState.listCards[payload.fromListId].some((task: TaskCardConfig, index: number) => {
        if (task.id === payload.cardId) {
          targetTaskIndex = index;
        }

        return task.id !== payload.cardId;
      });

      currState.listCards[payload.listId] = [ 
        ...currState.listCards[payload.listId], 
        { ...currState.listCards[payload.fromListId][targetTaskIndex] }
      ];
      currState.listCards[payload.fromListId].splice(targetTaskIndex, 1);
    }

    state.listCards = { ...currState.listCards };
  },
  addList: (state: TaskCardsState, action: PayloadAction<ListRef>) => {
    const currState = { ...state };
    
    if(!has(currState.listCards, action.payload.name)) {
      currState.listCards = { 
        ...currState.listCards, 
        [action.payload.name]: [] 
      };
    }

    state = { ...currState };
  }
};

export const createTaskCardSlice = (initialState: TaskCardsState) => (
  createSlice({
    initialState,
    reducers,
    name: 'taskCards' 
  })
);

export const taskCardsSlice = createTaskCardSlice(initialState);

export const createTaskCardsTestReducer = (initialState: TaskCardsState) => {
  const slice = createTaskCardSlice(initialState);

  return slice.reducer
}

export const { createTask, transferTask } = taskCardsSlice.actions;

export default taskCardsSlice.reducer;
