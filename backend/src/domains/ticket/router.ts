import { AsyncRouter } from 'express-async-router'
import TicketManager from './manager'

const router = AsyncRouter()

router.get('/:eventId', req => {
  return TicketManager.getAvailableTicketsForAnEvent(req.params.eventId)
})

export default router
