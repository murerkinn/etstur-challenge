import { Schema } from 'mongoose'
import User, { UserRaw } from './user'

export interface GuestRaw extends UserRaw {}

const schema = new Schema({}, { timestamps: true })

export default User.discriminator('Guest', schema)
