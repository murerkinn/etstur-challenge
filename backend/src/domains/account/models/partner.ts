import { Schema } from 'mongoose'
import User, { UserRaw } from './user'

export interface PartnerRaw extends UserRaw {}

const schema = new Schema({}, { timestamps: true })

export default User.discriminator('Partner', schema)
