import { Search } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from '@/app/store'

import { setTextSearch } from '../store/search-slice'

const TextSearch = () => {
  const dispatch = useAppDispatch()

  const { textSearch } = useAppSelector(state => state.search)

  return (
    <div className="selector-container text-search">
      <Search />
      <input
        placeholder="Search"
        type="text"
        onChange={e => dispatch(setTextSearch(e.target.value))}
        value={textSearch}
      />
    </div>
  )
}

export default TextSearch
