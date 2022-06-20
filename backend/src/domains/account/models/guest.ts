import { Schema, Document } from 'mongoose'
import User, { UserRaw } from './user'

export interface GuestRaw extends UserRaw {}
export interface GuestDocument extends Document, GuestRaw {}

const schema = new Schema<GuestDocument>({}, { timestamps: true })

export default User.discriminator<GuestDocument>('Guest', schema)
