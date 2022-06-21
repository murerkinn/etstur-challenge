import EventManager from './manager'

const getEventBySlug = async (slug: string) => {
  return EventManager.getEventBySlug(slug)
}

const EventBridge = {
  getEventBySlug,
}

export default EventBridge
