import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';

test('test DraggerUpload if has button', () => {
  render(<Header icon={<div>Admin tool</div>}></Header>);
  expect(screen.getByText("Admin tool")).toBeInTheDocument();
});

test('test Searchbutton', () => {
  let wrapper= render(<Header icon={<div>Admin tool</div>} searchInput={{value:"3",onChange:jest.fn()}}></Header>);
  expect(screen.getByText("Admin tool")).toBeInTheDocument();
  let searchInput= wrapper.getByDisplayValue("3");
  expect(searchInput).toBeInTheDocument();
  fireEvent.click(searchInput);

});