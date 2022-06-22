import startCase from 'lodash/startCase'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'

import { useAppSelector } from '@/app/store'
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

  const { tickets: ticketsInStore } = useAppSelector(state => state.cart)

  const [event, setEvent] = useState<Event | null>(null)
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)

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
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  const onDismiss = useCallback(() => {
    setBottomSheetOpen(false)
  }, [])

  useEffect(() => {
    setBottomSheetOpen(true)
  }, [])

  useEffect(() => {
    if (!query.slug) return

    fetchEvent()
  }, [query.slug])

  useEffect(() => {
    setBottomSheetOpen(true)
  }, [ticketsInStore])

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

                <SelectTicketSection
                  tickets={tickets}
                  eventId={event._id}
                  isFree={event.free}
                />

                <div className="organization-details">
                  <h3 className="organization-details-title">
                    Organizator of this event
                  </h3>

                  <div className="organization-info">
                    <img
                      src={event.organizator.photo.url}
                      alt={event.organizator.photo.description}
                    />

                    <div>
                      <Link
                        href={`/organizator/${event.organizator.slug}`}
                        passHref
                      >
                        <a>
                          <h1 className="organization-name">
                            {event.organizator.name}
                          </h1>
                        </a>
                      </Link>

                      <h4 className="organization-enrollment-date">
                        {moment
                          .utc(event.organizator.createdAt)
                          .format('[Member since] MMM, YYYY')}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tickets-card-container">
                <TicketsCard />
              </div>
            </div>
          </div>

          <BottomSheet
            open={bottomSheetOpen}
            defaultSnap={({ maxHeight }) => maxHeight / 2}
            snapPoints={({ maxHeight }) => [
              maxHeight / 10,
              maxHeight / 4,
              maxHeight * 0.6,
            ]}
            className="show-only-on-mobile"
            onDismiss={onDismiss}
          >
            <TicketsCard />
          </BottomSheet>
        </main>
      ) : null}
    </>
  )
}

export default EventDetailsPage
