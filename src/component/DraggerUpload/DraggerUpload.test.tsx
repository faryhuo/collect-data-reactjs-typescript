import { render, screen } from '@testing-library/react';
import DraggerUpload from './DraggerUpload';

test('test DraggerUpload if has button', () => {
  render(<DraggerUpload buttonText={"OK Button"} hint={"hit"}></DraggerUpload>);
  expect(screen.getByText("hit")).toBeInTheDocument();
  expect(screen.getByText("OK Button")).toBeInTheDocument();
});

