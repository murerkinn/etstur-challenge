import { model, Schema, Document } from 'mongoose'
import slug from 'slug'

import {
  PhotoDocument,
  PhotoRaw,
  photoSchema,
} from '@/domains/event/models/photo'

export interface OrganizationRaw {
  name: string
  photo?: PhotoRaw
}

export interface OrganizationDocument extends Document, OrganizationRaw {
  slug: string
  photo: PhotoDocument
}

const schema = new Schema<OrganizationDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    photo: photoSchema,
  },
  { timestamps: true }
)

schema.pre('save', function () {
  if (!this.slug) this.slug = slug(this.name) + '-' + this._id
})

export default model<OrganizationDocument>('Organization', schema)
