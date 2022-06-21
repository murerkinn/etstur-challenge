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
