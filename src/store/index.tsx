import { configureStore } from '@reduxjs/toolkit';

import listsReducer from '../reducers/lists';
import taskCardsReducer from '../reducers/taskCards';

export const store = configureStore({
    reducer: {
        lists: listsReducer,
        taskCards: taskCardsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;