import React from 'react';
import { render, screen } from '@testing-library/react';
import { ListComponent } from './index';

test('it should display title as list heading', () => {
  const testTitle = "todo test";

  render(<ListComponent title={testTitle} />);

  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent(testTitle);
});

test('it should display Untitled when no title is provided to the list', () => {
  render(<ListComponent />);

  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent("Untitled");
});

test('it should display 2 task cards given with 2 taskcard configs', () => {
  const taskItems = [
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
  ];

  render(<ListComponent title={'List'} items={taskItems} />);

  const taskcards = screen.getAllByTestId('taskcard');
  expect(taskcards.length).toEqual(taskItems.length);
})