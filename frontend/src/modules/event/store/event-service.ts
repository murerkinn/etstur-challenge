import { API } from '@/lib/api'

const getEventBySlug = async (slug: string) => {
  const { data } = await API.get(`/event/${slug}`)

  return data
}

const EventService = {
  getEventBySlug,
}

export default EventService
