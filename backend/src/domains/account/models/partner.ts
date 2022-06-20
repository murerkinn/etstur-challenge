import { Schema, Document } from 'mongoose'
import User, { UserRaw } from './user'

export interface PartnerRaw extends UserRaw {}

export interface PartnerDocument extends Document, PartnerRaw {}

const schema = new Schema<PartnerDocument>({}, { timestamps: true })

export default User.discriminator<PartnerDocument>('Partner', schema)
