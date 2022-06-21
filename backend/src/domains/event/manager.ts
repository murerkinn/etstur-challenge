import Event from './models/event'

const getEventBySlug = async (slug: string) => {
  const event = await Event.findOne({ slug })

  return event
}

const EventManager = {
  getEventBySlug,
}

export default EventManager
