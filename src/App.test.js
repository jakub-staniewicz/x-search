import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render an input', () => {
    const { getByRole } = render(<App />);
    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByRole('textbox')).not.toHaveAttribute('aria-label');
  });
});
