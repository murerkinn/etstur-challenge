import { EventDocument } from '@/domains/event/models/event'
import { Schema, Document, model } from 'mongoose'

export interface TicketRaw {
  price: number
  event: EventDocument['_id']
  series: string
}

export interface TicketDocument extends TicketRaw, Document {}

const schema = new Schema<TicketDocument>(
  {
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    event: {
      type: String,
      ref: 'Event',
      required: true,
    },
    series: {
      type: String,
      default: 'default',
    },
  },
  { timestamps: true }
)

export default model<TicketDocument>('Ticket', schema)
