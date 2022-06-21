import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import EventList from '@/modules/search/components/event-list'
import Pagination from '@/modules/search/components/pagination'
import { search } from '@/modules/search/store/actions'

const SearchPage = () => {
  const { query } = useRouter()

  const { events, totalPageCount, loading } = useAppSelector(
    state => state.search
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      search({
        startsAt: query.startsAt,
        endsAt: query.endsAt,
        textSearch: query.textSearch,
        page: query.page,
        city: query.city,
        categor: query.category,
      })
    )
  }, [
    query.startsAt,
    query.endsAt,
    query.textSearch,
    query.page,
    query.city,
    query.category,
    dispatch,
  ])

  return (
    <>
      <main className="page search-page">
        <div className="container">
          <EventList events={events} />
          <Pagination pageCount={totalPageCount} />
        </div>
      </main>
    </>
  )
}

export default SearchPage
