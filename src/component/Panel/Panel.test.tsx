import { render, screen } from '@testing-library/react';
import Panel from './Panel';

test('test Panel if has the  title', () => {
  render(<Panel title="Upload file"></Panel>);
  const linkElement = screen.getByText("Upload file");
  expect(linkElement).toBeInTheDocument();
});

test('test Panel if has the  clild', () => {
  render(<Panel title="Upload file">child</Panel>);
  const linkElement = screen.getByText("child");
  expect(linkElement).toBeInTheDocument();
});