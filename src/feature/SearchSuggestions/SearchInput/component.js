import { forwardRef } from "react"
export const SearchInput = forwardRef(({ value, onChange }, ref) => {

  return <input
    type="text"
    value={value}
    onChange={onChange}
    ref={ref}
  />
} )