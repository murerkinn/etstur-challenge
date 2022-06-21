import { Add, Remove } from '@mui/icons-material'
import { useCallback, useMemo } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import Button from '@/components/button'
import {
  addTicketToCart,
  removeTicketFromCart,
} from '@/modules/cart/store/cart-slice'

import { AvailableTicketData } from '../store/types'

type SelectTicketSectionProps = {
  tickets: AvailableTicketData[]
  eventId: string
}

type TicketSelectorProps = {
  ticket: AvailableTicketData
  eventId: string
}

const TicketSelector = ({ ticket, eventId }: TicketSelectorProps) => {
  const dispatch = useAppDispatch()
  const { tickets } = useAppSelector(state => state.cart)

  const countInCart = useMemo(
    () =>
      tickets.find(
        t =>
          t.series === ticket.details.series &&
          t.price === ticket.details.price &&
          t.event === eventId
      )?.quantity || 0,
    [tickets, ticket]
  )

  const handleAdd = useCallback(() => {
    const ticketPayload = {
      series: ticket.details.series,
      price: ticket.details.price,
      event: eventId,
    }

    dispatch(addTicketToCart(ticketPayload))
  }, [ticket, eventId])

  const handleRemove = useCallback(
    (series: string) => {
      dispatch(removeTicketFromCart({ event: eventId, series }))
    },
    [eventId]
  )

  return (
    <div className="ticket-selector">
      <span className="series">{ticket.details.series}</span>

      <div className="counter">
        <Button
          variant="icon-only"
          className="btn-secondary"
          onClick={() => handleRemove(ticket.details.series)}
          disabled={countInCart === 0}
        >
          <Remove />
        </Button>

        <span className="count">{countInCart}</span>

        <Button
          variant="icon-only"
          className="btn-secondary"
          onClick={handleAdd}
          disabled={countInCart === ticket.quantity}
        >
          <Add />
        </Button>
      </div>
    </div>
  )
}

const SelectTicketSection = ({
  tickets,
  eventId,
}: SelectTicketSectionProps) => {
  return (
    <div className="select-ticket-section">
      <h3 className="select-ticket-section-title">Tickets for this event</h3>

      <div className="available-ticket-list">
        {tickets.map(ticket => (
          <TicketSelector
            key={ticket.details.series}
            ticket={ticket}
            eventId={eventId}
          />
        ))}
      </div>
    </div>
  )
}

export default SelectTicketSection
