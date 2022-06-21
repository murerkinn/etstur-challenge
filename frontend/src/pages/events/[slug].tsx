import startCase from 'lodash/startCase'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import EventInfo from '@/modules/event/components/event-info'
import EventPhotosCarousel from '@/modules/event/components/event-photos-carousel'
import MapSection from '@/modules/event/components/map-section'
import SelectTicketSection from '@/modules/event/components/select-ticket-section'
import TicketsCard from '@/modules/event/components/tickets-card'
import EventService from '@/modules/event/store/event-service'
import { Event } from '@/modules/event/store/types'

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

const EventDetailsPage = () => {
  const { query } = useRouter()

  const [event, setEvent] = useState<Event | null>(null)
  const [tickets, setTickets] = useState([])
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
      const event_ = await EventService.getEventBySlug(query.slug as string)
      const tickets_ = await EventService.getAvailableTicketsForAnEvent(
        event_._id
      )

      setEvent(event_)
      setTickets(tickets_)
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

                <SelectTicketSection tickets={tickets} eventId={event._id} />
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
