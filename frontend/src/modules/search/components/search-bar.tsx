import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import TuneIcon from '@mui/icons-material/Tune'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import Button from '@/components/button'

import { setSearchBottomSheetOpen } from '../store/search-slice'
import CategorySelector from './category-selector'
import CitySelector from './city-selector'
import DateSelector from './date-selector'
import TextSearch from './text-search'

const SearchBar = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const { city, category, startsAt, endsAt, textSearch } = useAppSelector(
    state => state.search
  )

  const onSearch = useCallback(() => {
    const query: any = {}

    if (city) query.city = city
    if (category) query.category = category
    if (startsAt) query.startsAt = startsAt
    if (endsAt) query.endsAt = endsAt
    if (textSearch) query.textSearch = textSearch

    router.push({
      pathname: '/search',
      query,
    })
  }, [city, category, startsAt, endsAt, textSearch])

  const openSearchBottomSheet = useCallback(() => {
    dispatch(setSearchBottomSheetOpen(true))
  }, [])

  return (
    <div className="search-bar">
      <div className="container search-bar-inner">
        <TextSearch />
        <CategorySelector className="show-only-on-desktop" />
        <DateSelector className="show-only-on-desktop" />
        <CitySelector className="show-only-on-desktop" />

        <Button
          variant="primary"
          onClick={onSearch}
          className="show-only-on-desktop"
        >
          <SearchOutlinedIcon />
        </Button>

        <Button
          onClick={openSearchBottomSheet}
          variant="icon-only"
          className="hide-on-desktop"
        >
          <TuneIcon />
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
