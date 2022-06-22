import { Event } from '@/modules/event/store/types'

export type Category = {
  _id: string
  name: string
  slug: string
}

export type SearchStore = {
  city: string
  startsAt: string
  endsAt: string
  textSearch: string
  category: string
  pageLimit: number
  page: number
  loading: boolean
  events: Event[]
  totalPageCount: number
  categories: Category[]
}
