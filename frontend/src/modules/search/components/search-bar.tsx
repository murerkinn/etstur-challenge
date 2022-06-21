import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { useAppSelector } from '@/app/store'
import Button from '@/components/button'

import CategorySelector from './category-selector'
import CitySelector from './city-selector'
import DateSelector from './date-selector'
import TextSearch from './text-search'

const SearchBar = () => {
  const router = useRouter()

  const { city, category, startsAt, endsAt } = useAppSelector(
    state => state.search
  )

  const onSearch = useCallback(() => {
    router.push({
      pathname: '/search',
      query: {
        city,
        category,
        startsAt,
        endsAt,
      },
    })
  }, [city, category, startsAt, endsAt])

  return (
    <div className="search-bar">
      <div className="container search-bar-inner">
        <TextSearch />
        <CategorySelector />
        <DateSelector />
        <CitySelector />

        <Button variant="primary" onClick={onSearch}>
          <SearchOutlinedIcon />
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
