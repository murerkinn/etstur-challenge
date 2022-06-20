import { Schema, Document } from 'mongoose'

export interface AddressRaw {
  country: string
  city: string
  zipCode: string
  street: string
  additionalAddressLine?: string
}

export interface AddressDocument extends Document, AddressRaw {}

export const addressSchema = new Schema<AddressDocument>(
  {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    additionalAddressLine: String,
  },
  { _id: false }
)
