import { API } from '@/lib/api'

const getEventBySlug = async (slug: string) => {
  const { data } = await API.get(`/event/${slug}`)

  return data
}

const getAvailableTicketsForAnEvent = async (eventId: string) => {
  const { data } = await API.get(`/ticket/${eventId}`)

  return data
}

const EventService = {
  getEventBySlug,
  getAvailableTicketsForAnEvent,
}

export default EventService
