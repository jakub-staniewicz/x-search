import { render, screen } from '@testing-library/react';
import App from './App';

test('It just renders', () => {
  render(<App />);
  const linkElement = screen.getByText(/Tu bedzie input/i);
  expect(linkElement).toBeInTheDocument();
});
