import { model, Schema, Document, Model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserRaw {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface UserDocument extends Document, Omit<UserRaw, 'password'> {
  hash: string

  validatePassword(password: string): Promise<string>
}

export interface UserModel extends Model<UserDocument> {
  calculateHash(password: string): Promise<string>
}

const schema = new Schema<UserDocument, UserModel>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    hash: {
      type: String,
      required: true,
      select: false,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, discriminatorKey: 'kind' }
)

schema.statics.calculateHash = function (this: UserModel, password: string) {
  return bcrypt.hash(password, 10)
}

schema.methods.validatePassword = function (
  this: UserDocument,
  password: string
) {
  return bcrypt.compare(password, this.hash)
}

export default model<UserDocument, UserModel>('User', schema)
