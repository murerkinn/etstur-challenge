type Category = {
  _id: string
  name: string
}

export type Event = {
  _id: string
  name: string
  slug: string
  organizator: string
  organizatorName: string
  startsAt: Date
  endsAt: Date
  category: Category
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
}
