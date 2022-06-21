import Ticket, { TicketRaw } from './models/ticket'

const createTicket = async (rawTicket: TicketRaw) => {
  const ticket = await Ticket.create({
    price: rawTicket.price,
    event: rawTicket.event,
    series: rawTicket.series,
  })

  return ticket
}

const getAvailableTicketsForAnEvent = async (eventId: string) => {
  return Ticket.aggregate([
    { $match: { event: eventId } }, // TODO: add if ticket is sold or not
    {
      $group: {
        _id: { series: '$series' },
        details: {
          $mergeObjects: {
            // @ts-ignore
            price: '$price',
            series: '$series',
          },
        },
        quantity: { $count: {} },
      },
    },
    {
      $sort: { 'details.series': 1 },
    },
    {
      $project: { _id: 0, details: 1, quantity: 1 },
    },
  ])
}

const TicketManager = {
  createTicket,
  getAvailableTicketsForAnEvent,
}

export default TicketManager
