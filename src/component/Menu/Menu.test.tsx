import React from 'react';
import { render, screen } from '@testing-library/react';
import Menu from './Menu';
import menuItems from '../../common/MenuConfig';
import { HashRouter } from 'react-router-dom';

test('test menu item', () => {
  render(<HashRouter><Menu menuItems={menuItems}/></HashRouter>);
  const linkElement = screen.getByText("Generate License File")
  expect(linkElement).toBeInTheDocument();
});
