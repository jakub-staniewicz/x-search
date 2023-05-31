import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Pagination } from './component';

describe('Pagination', () => {
  it('should render the Prev and Next buttons', () => {
    const { getByText } = render(<Pagination listLength={10} offset={0} setOffset={() => {}} />);
    expect(getByText('Prev')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
  });

  it('should disable the Prev button when offset is 0', () => {
    const { getByText } = render(<Pagination listLength={10} offset={0} setOffset={() => {}} />);
    const prevButton = getByText('Prev');
    expect(prevButton).toBeDisabled();
  });

  it('should disable the Next button when there are no more items to show', () => {
    const { getByText } = render(<Pagination listLength={10} offset={5} setOffset={() => {}} />);
    const nextButton = getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('should call the setOffset function when the Prev or Next buttons are clicked', () => {
    const setOffsetMock = jest.fn();
    const { getByText } = render(<Pagination listLength={25} offset={10} setOffset={setOffsetMock} />);
    const prevButton = getByText('Prev');
    const nextButton = getByText('Next');
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    expect(setOffsetMock).toHaveBeenCalledTimes(2);
  });
});