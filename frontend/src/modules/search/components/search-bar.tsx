import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import Button from '@/components/button'

import CategorySelector from './category-selector'
import CitySelector from './city-selector'
import DateSelector from './date-selector'

const SearchBar = () => {
  return (
    <div className="search-bar">
      <div className="container search-bar-inner">
        <CategorySelector />
        <DateSelector />
        <CitySelector />

        <Button variant="primary">
          <SearchOutlinedIcon />
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
