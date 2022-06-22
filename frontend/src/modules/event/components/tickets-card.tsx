import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import EmailIcon from '@mui/icons-material/Email'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TelegramIcon from '@mui/icons-material/Telegram'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import startCase from 'lodash/startCase'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'

import { useAppSelector } from '@/app/store'
// import Button from '@/components/button'
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

      {/* <Button
        className="btn-block continue-button"
        variant="primary"
        disabled={tickets.length === 0}
      >
        Continue
      </Button> */}

      <div className="social-buttons">
        <EmailShareButton
          url={window.location.href}
          className="btn btn-icon-only"
        >
          <EmailIcon />
        </EmailShareButton>

        <FacebookShareButton
          url={window.location.href}
          className="btn btn-icon-only"
        >
          <FacebookOutlinedIcon />
        </FacebookShareButton>

        <LinkedinShareButton
          url={window.location.href}
          className="btn btn-icon-only"
        >
          <LinkedInIcon />
        </LinkedinShareButton>

        <TelegramShareButton
          url={window.location.href}
          className="btn btn-icon-only"
        >
          <TelegramIcon />
        </TelegramShareButton>

        <TwitterShareButton
          url={window.location.href}
          className="btn btn-icon-only"
        >
          <TwitterIcon />
        </TwitterShareButton>

        <WhatsappShareButton
          url={window.location.href}
          className="btn btn-icon-only"
        >
          <WhatsAppIcon />
        </WhatsappShareButton>
      </div>
    </div>
  )
}

export default TicketsCard
