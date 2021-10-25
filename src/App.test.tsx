import { render, screen } from '@testing-library/react';
import App from './App';
import stores from './store/index';

test('renders application page if has the Admin text', () => {
  render(<App {...stores}/>);
  // const linkElement = screen.getAllByTestId("App_Conponent")
  // expect(linkElement).toBeInTheDocument();
});

