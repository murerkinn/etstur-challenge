import { Schema, Document } from 'mongoose'

export interface LocationRaw {
  type: string
  coordinates: number[]
}

export interface LocationDocument extends Document, LocationRaw {}

export const locationSchema = new Schema<LocationDocument>(
  {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  { _id: false }
)
