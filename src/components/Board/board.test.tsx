import React from 'react';
import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';

import Board from './index';
import { store } from '../../store';

test('it should display title as board heading', () => {
  const testTitle = "todo test";

  render(<Board title={testTitle} />);

  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent(testTitle);
});

test('it should display Untitled when no title is provided', () => {
  render(<Board />);

  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent("Untitled");
});

test('it should display 2 list component when given 2 list data', () => {
  const testTitle = "todo test";

  const listData = [
    {
      name: 'To Dos',
      id: 'todos'
    },
    {
      name: 'Done',
      id: 'done'
    }
  ];

  render(
    <Provider store={store}>
      <Board title={testTitle} lists={listData}/>
    </Provider>
  );

  const listChildren = screen.getAllByTestId('list-child');
  
  expect(listChildren.length).toEqual(listData.length);
});
