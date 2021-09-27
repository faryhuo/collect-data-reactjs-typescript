/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import HtmlTable from './HtmlTable';
import stores from 'src/store/index';

test('test HtmlTable if has the columns', () => {
  render(<HtmlTable showMessage={()=>{}} {...stores}></HtmlTable>);
  expect(screen.getByText("File Name")).toBeInTheDocument();
  expect(screen.getByText("Size")).toBeInTheDocument();
  expect(screen.getByText("last Modified Date")).toBeInTheDocument();
  expect(screen.getByText("Action")).toBeInTheDocument();

});

