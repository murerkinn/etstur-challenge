import { model, Schema, Document } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'
import slug from 'slug'

import { CategoryDocument } from '@/domains/category/models/category'
import { OrganizationDocument } from '@/domains/organization/models/organization'

import { PhotoDocument, PhotoRaw } from './photo'
import { AddressDocument, AddressRaw, addressSchema } from './address'
import { LocationDocument, LocationRaw, locationSchema } from './location'

interface PriceCategory {
  label: string
  code: string
  price: number
}

export interface EventRaw {
  name: string
  category: CategoryDocument['_id']
  location: LocationRaw
  description: string
  photos: PhotoRaw[]
  prices?: PriceCategory[]
  free?: boolean
  organizator: OrganizationDocument['_id']
  address: AddressRaw
  startsAt: Date
  endsAt: Date
}

export interface EventDocument extends Document, EventRaw {
  slug: string
  location: LocationDocument
  photos: PhotoDocument[]
  free: boolean
  organizatorName: string
  address: AddressDocument
}

const schema = new Schema<EventDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    free: {
      type: Boolean,
      default: false,
    },
    organizator: {
      type: String,
      ref: 'Organization',
      autopopulate: true,
    },
    organizatorName: {
      type: String,
      required: true,
    },
    location: locationSchema,
    address: addressSchema,
    startsAt: {
      type: Date,
      required: true,
    },
    endsAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

schema.pre<EventDocument>('save', function () {
  if (!this.slug) this.slug = slug(this.name) + '-' + this._id
})

schema.plugin(autopopulate)

export default model<EventDocument>('Event', schema)
