import moment from 'moment'
import Link from 'next/link'

import { Event } from '../store/types'

type EventListItemProps = {
  event: Event
}

const EventListItem = ({ event }: EventListItemProps) => {
  return (
    <div className="event-list-item">
      <div className="event-list-item-cell event-cell">
        <img src="/images/slide.jpg" alt={event.name} className="thumbnail" />

        <Link href={`/event/${event.slug}`} passHref>
          <a>{event.name}</a>
        </Link>
      </div>

      <div className="event-list-item-cell organization-cell">
        <h3>{event.organizatorName}</h3>
      </div>

      <div className="event-list-item-cell dates-cell">
        <span className="start-date">
          {moment.utc(event.startsAt).format('ddd, DD/MM/YY')}
        </span>
        <span className="end-date">
          {moment.utc(event.endsAt).format('ddd, DD/MM/YY')}
        </span>
      </div>
    </div>
  )
}

type EventListProps = {
  events: Event[]
}

const EventList = ({ events }: EventListProps) => {
  return (
    <div className="event-list">
      <div className="event-list-head">
        <span>Event</span>
        <span>Organizator</span>
        <span>Date</span>
      </div>

      <div className="event-list-body">
        {events.map(event => (
          <EventListItem event={event} key={event._id} />
        ))}
      </div>
    </div>
  )
}

export default EventList
