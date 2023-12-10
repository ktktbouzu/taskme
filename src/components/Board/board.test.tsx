import React from 'react';
import { render, screen } from '@testing-library/react';
import Board from './index';

test('it should display title as board heading', () => {
  const testTitle = "todo test";

  render(<Board title={testTitle} />);

  const linkElement = screen.getByRole('heading');
  expect(linkElement).toHaveTextContent(testTitle);
});
