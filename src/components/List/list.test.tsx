import React from 'react';
import { Provider } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';

import List from './index';

import { createTaskCardsTestReducer } from '../../reducers/taskCards';
import { store } from '../../store';

const taskCardsState = {
  listCards: {
    todos: [
      {
        title: 'task 1',
        id: 'task1',
        taskDate: '1970-01-01'
      },
      {
        title: 'task 2',
        id: 'task2',
        taskDate: '2024-01-01'
      }
    ]
  }
};

const makeMockStore = () => {
  const taskCardsReducer = createTaskCardsTestReducer(taskCardsState);

  return configureStore({
    reducer: {
      taskCards: taskCardsReducer
    }
  });
}

const mockStore = makeMockStore();

test('it should display title as list heading', () => {
  const listConfig = {
    name: 'todo test',
    id: 'todo_test',
    transitionRules: []
  }

  render(
    <Provider store={mockStore}>
      <DndProvider backend={HTML5Backend}>
        <List listConfig={listConfig} />
      </DndProvider>
    </Provider>
  );

  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent(listConfig.name);
});

// test('it should display Untitled when no title is provided to the list', () => {
//   render(<List />);

//   const heading = screen.getByRole('heading');
//   expect(heading).toHaveTextContent("Untitled");
// });

test('it should display 2 task cards given with 2 taskcard configs', () => {
  const listConfig = {
    name: 'To Dos',
    id: 'todos',
    transitionRules: []
  };

  render (
    <Provider store={mockStore}>
      <DndProvider backend={HTML5Backend}>
        <List listConfig={listConfig} />
      </DndProvider>
    </Provider>
  );

  const taskcards = screen.getAllByTestId('taskcard');
  expect(taskcards.length).toEqual(taskCardsState.listCards.todos.length);
})