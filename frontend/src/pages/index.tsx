import { useEffect, useState } from 'react'

import PopularEventsCarousel from '@/modules/home/components/popular-events-carousel'
import SearchService from '@/modules/search/store/search-service'

const HomePage = () => {
  const [popularEvents, setPopularEvents] = useState([])

  useEffect(() => {
    SearchService.getPopularEvents().then(setPopularEvents).catch(console.error)
  }, [])

  return (
    <>
      <main className="page home-page">
        <div className="container">
          <section className="hero-section">
            <PopularEventsCarousel events={popularEvents} />
          </section>
        </div>
      </main>
    </>
  )
}

export default HomePage
