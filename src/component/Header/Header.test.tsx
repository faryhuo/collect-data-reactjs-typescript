import { render, screen } from '@testing-library/react';
import Header from './Header';

test('test DraggerUpload if has button', () => {
  render(<Header icon={<div>Admin tool</div>}></Header>);
  expect(screen.getByText("Admin tool")).toBeInTheDocument();
});