export type Ticket = {
  price: number
  series: string
  event: string
}

export type TicketInCart = Ticket & {
  quantity: number
}

export type CartStore = {
  tickets: TicketInCart[]
}
