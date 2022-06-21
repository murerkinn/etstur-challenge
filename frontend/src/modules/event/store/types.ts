export type Photo = {
  _id: string
  url: string
  description: string
}

type Category = {
  _id: string
  name: string
}

type Ticket = {
  _id: string
  type: string
  price: number
}

export type TicketInCart = Ticket & {
  quantity: number
}

export type Event = {
  _id: string
  name: string
  description: string
  slug: string
  organizator: string
  organizatorName: string
  startsAt: Date
  endsAt: Date
  category: Category
  location: {
    type: string
    coordinates: number[]
  }
  photos: Photo[]
}
