import { forwardRef } from "react"
export const SearchInput = forwardRef(({ value, onChange, onClick }, ref) => {

  return <div className="searchInput"><input
    type="text"
    value={value}
    onChange={onChange}
    onClick={onClick}
    ref={ref}
  /></div>
} )