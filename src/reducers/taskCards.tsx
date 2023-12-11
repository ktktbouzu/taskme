import { createSlice } from '@reduxjs/toolkit';

import { TaskCardConfig } from '../types';

export type TaskCardsState = {
  listCards: Record<string, Array<TaskCardConfig>>
};

const initialState: TaskCardsState = {
  listCards: {
    todos: [
      {
        title: 'Task Card Sample',
        id: '012345',
        taskDate: '1970-01-01'
      },
      {
        title: 'Task Card Sample 2',
        id: '012346',
        taskDate: '2024-01-01'
      }
    ]
  }
};

export const taskCardsSlice = createSlice({
  initialState,
  name: 'taskCards',
  reducers: {
    createTask: () => {

    }
  }
});

export default taskCardsSlice.reducer;
