export type Photo = {
  _id: string
  url: string
  description: string
}

type Category = {
  _id: string
  name: string
}

type Address = {
  city: string
  country: string
  street: string
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
  address: Address
}
