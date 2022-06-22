import Event, { EventRaw } from './models/event'

type EventCreateData = EventRaw & {
  organizationName: string
}

const createEvent = async (eventData: EventCreateData) => {
  const event = await Event.create({
    name: eventData.name,
    category: eventData.category,
    description: eventData.description,
    free: eventData.free,
    organizator: eventData.organizator,
    organizatorName: eventData.organizationName,
    startsAt: eventData.startsAt,
    endsAt: eventData.endsAt,
    photos: eventData.photos,
    location: eventData.location,
    address: eventData.address,
  })

  return event
}

const getEventBySlug = async (slug: string) => {
  const event = await Event.findOne({ slug })

  return event
}

const EventManager = {
  createEvent,
  getEventBySlug,
}

export default EventManager
