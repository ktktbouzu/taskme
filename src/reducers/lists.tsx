import { createSlice } from '@reduxjs/toolkit';

import { ListConfig } from '../types';

export type ListState = {
  listConfigs: Array<ListConfig>
};

const initialState: ListState = {
  listConfigs: [
    {
      name: 'To Dos',
      id: 'todos'
    },
    {
      name: 'In Progress',
      id: 'in_progress'
    },
    {
      name: 'Done',
      id: 'done'
    },
    {
      name: 'Deleted',
      id: 'deleted'
    }
  ]
};

export const listsSlice = createSlice({
  initialState,
  name: 'lists',
  reducers: {
    createList: (state) => { 
      //placeholder for now.
    }
  }
});

export const { createList } = listsSlice.actions;

export default listsSlice.reducer;
