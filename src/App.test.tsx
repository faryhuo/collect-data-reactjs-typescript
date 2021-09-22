import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import stores from './store/index';

test('renders learn react link', () => {
  render(<App {...stores}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
