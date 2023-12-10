import React from 'react';
import { render, screen } from '@testing-library/react';
import List from './index';

test('it should display title as list heading', () => {
  const testTitle = "todo test";

  render(<List title={testTitle} />);

  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent(testTitle);
});

test('it should display Untitled when no title is provided to the list', () => {
  render(<List />);

  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent("Untitled");
});