import moment from 'moment'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import PopularEventsCarousel from '@/modules/home/components/popular-events-carousel'
import EventList from '@/modules/search/components/event-list'
import SearchService from '@/modules/search/store/search-service'

const HomePage = () => {
  const [popularEvents, setPopularEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])

  useEffect(() => {
    SearchService.getPopularEvents().then(setPopularEvents).catch(console.error)
    SearchService.search({
      startsAt: moment.utc().subtract(1, 'year').format('YYYY-MM-DD'),
      endsAt: moment.utc().format('YYYY-MM-DD'),
    })
      .then(data => {
        setPastEvents(data.list)
      })
      .catch(console.error)
  }, [])

  return (
    <>
      <main className="page home-page">
        <div className="container">
          <section className="hero-section">
            <PopularEventsCarousel events={popularEvents} />
          </section>

          <section className="past-events-section">
            <h2 className="past-events-section-title">
              Some of the Past Events
            </h2>

            <EventList events={pastEvents} hideHeader />

            <Link
              href={{
                pathname: '/search',
                query: {
                  startsAt: moment
                    .utc()
                    .subtract(1, 'year')
                    .format('YYYY-MM-DD'),
                  endsAt: moment.utc().format('YYYY-MM-DD'),
                },
              }}
              passHref
            >
              <a className="btn btn-secondary btn-medium btn-block">
                See All Past Events
              </a>
            </Link>
          </section>
        </div>
      </main>
    </>
  )
}

export default HomePage
