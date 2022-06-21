import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import startCase from 'lodash/startCase'

import { useAppSelector } from '@/app/store'
import Button from '@/components/button'
import formatMoney from '@/lib/format-money'
import { TicketInCart } from '@/modules/cart/store/types'

type TicketDetailsProps = {
  ticket: TicketInCart
}

const TicketDetails = ({ ticket }: TicketDetailsProps) => {
  return (
    <div className="ticket-details">
      <div className="ticket-details-item">
        <span className="label">Series:</span>
        <span>{startCase(ticket.series)}</span>
      </div>

      <div className="ticket-details-item">
        <span className="label">Price:</span>
        <span>{formatMoney(ticket.price)}</span>
      </div>

      <div className="ticket-details-item">
        <span className="label">Quantity:</span>
        <span>{ticket.quantity}</span>
      </div>
    </div>
  )
}

const TicketsCard = () => {
  const { tickets } = useAppSelector(state => state.cart)

  return (
    <div className="tickets-card">
      <div className="tickets-card-head">
        <ConfirmationNumberOutlinedIcon />

        <h4 className="tickets-card-title">Your Tickets</h4>
      </div>

      {tickets.length > 0 ? (
        tickets.map(ticket => (
          <TicketDetails
            key={ticket.event + '-' + ticket.series}
            ticket={ticket}
          />
        ))
      ) : (
        <div className="no-tickets">
          <img src="/images/no-data.svg" alt="No Data" />

          <h5>You didn't pick any tickets yet</h5>
        </div>
      )}

      <Button
        className="btn-block"
        variant="primary"
        disabled={tickets.length === 0}
      >
        Continue
      </Button>
    </div>
  )
}

export default TicketsCard
