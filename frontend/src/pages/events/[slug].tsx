import startCase from 'lodash/startCase'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import EventInfo from '@/modules/event/components/event-info'
import EventPhotosCarousel from '@/modules/event/components/event-photos-carousel'
import MapSection from '@/modules/event/components/map-section'
import TicketsCard from '@/modules/event/components/tickets-card'
import EventService from '@/modules/event/store/event-service'
import { Event } from '@/modules/event/store/types'

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

const EventDetailsPage = () => {
  const { query } = useRouter()

  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const address = useMemo(() => {
    if (!event) return ''

    const { city, country } = event.address

    return [startCase(city), regionNames.of(country)].filter(Boolean).join(', ')
  }, [event])

  const fetchEvent = async () => {
    setLoading(true)

    try {
      const data = await EventService.getEventBySlug(query.slug as string)

      setEvent(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!query.slug) return

    fetchEvent()
  }, [query.slug])

  return (
    <>
      {!loading && event ? (
        <main className="page event-details-page">
          <div className="container">
            <div className="event-details-page-inner">
              <div className="event-details-page-content">
                <EventPhotosCarousel photos={event.photos} />

                <EventInfo name={event.name} description={event.description} />

                <MapSection
                  lat={event.location.coordinates[1]}
                  lng={event.location.coordinates[0]}
                  address={address}
                />
              </div>

              <div className="tickets-card-container">
                <TicketsCard />
              </div>
            </div>
          </div>
        </main>
      ) : null}
    </>
  )
}

export default EventDetailsPage
