import { render, screen } from '@testing-library/react';
import PreviewHTML from './PreviewHTML';

test('test PreviewHTML if has content and hidden', () => {
  render(<PreviewHTML visible={false} handleCancel={()=>{}} title="html1" children="<span>Conetnt 1</span>"></PreviewHTML>);
  const linkElement = screen.queryByText("Content1")
  expect(linkElement).toBeNull();

});

test('test PreviewHTML if visible', () => {
  render(<PreviewHTML visible={true} handleCancel={()=>{}} title="html1" children="<span>Conetnt 1</span>"></PreviewHTML>);
  const linkElement = screen.getByText("Conetnt 1");
  expect(linkElement).toBeInTheDocument();
});

test('test PreviewHTML if has title', () => {
  render(<PreviewHTML visible={true} handleCancel={()=>{}} title="html1" children="<span>Conetnt 1</span>"></PreviewHTML>);
  const linkElement = screen.getByText("html1");
  expect(linkElement).toBeInTheDocument();
});