import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'

import { useAppDispatch, useAppSelector } from '@/app/store'
import Button from '@/components/button'

import { setSearchBottomSheetOpen } from '../store/search-slice'
import CategorySelector from './category-selector'
import CitySelector from './city-selector'
import DateSelector from './date-selector'
import TextSearch from './text-search'

const SearchBottomSheet = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const {
    city,
    category,
    startsAt,
    endsAt,
    textSearch,
    searchBottomSheetOpen,
  } = useAppSelector(state => state.search)

  const onDismiss = useCallback(() => {
    dispatch(setSearchBottomSheetOpen(false))
  }, [])

  const onSearch = useCallback(() => {
    const query: any = {}

    dispatch(setSearchBottomSheetOpen(false))

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

  return (
    <BottomSheet
      open={searchBottomSheetOpen}
      defaultSnap={({ maxHeight }) => maxHeight / 2}
      className="show-only-on-mobile search-bottom-sheet"
      onDismiss={onDismiss}
    >
      <div className="search-bottom-sheet-content">
        <TextSearch />
        <CategorySelector />
        <DateSelector />
        <CitySelector />

        <Button variant="primary" className="btn-block" onClick={onSearch}>
          Search
        </Button>
      </div>
    </BottomSheet>
  )
}

export default SearchBottomSheet
