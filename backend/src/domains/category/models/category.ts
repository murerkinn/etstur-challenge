import { model, Schema, Document } from 'mongoose'
import slug from 'slug'

export interface CategoryRaw {
  name: string
}

export interface CategoryDocument extends Document, CategoryRaw {
  slug: string
}

const schema = new Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
)

schema.pre('save', function () {
  if (!this.slug) this.slug = slug(this.name) + '-' + this._id
})

export default model<CategoryDocument>('Category', schema)
