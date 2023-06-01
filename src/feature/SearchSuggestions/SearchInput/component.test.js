import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './component';

describe('SearchInput', () => {
 it('renders the search input with the correct value and onChange function', () => {
 const value = 'test search';
 const onChange = jest.fn();
 const onClick = jest.fn();
 const ref = { current: null };
 const { getByDisplayValue } = render(
 <SearchInput value={value} onChange={onChange} onClick={onClick} ref={ref} />
 );
 const input = getByDisplayValue(value);
 expect(input).toBeInTheDocument();
 userEvent.type(input, 'new search');
 expect(onChange).toHaveBeenCalledTimes(10);
 });
});
