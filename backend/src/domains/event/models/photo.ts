import { Schema, Document } from 'mongoose'

export interface PhotoRaw {
  url: string
  description?: string
}

export interface PhotoDocument extends Document, PhotoRaw {}

export const photoSchema = new Schema<PhotoDocument>({
  url: {
    type: String,
    required: true,
  },
  description: String,
})
