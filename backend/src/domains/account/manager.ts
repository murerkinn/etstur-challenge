import Debug from 'debug'

import User from './models/user'
import { NotFoundError, UnauthorizedRequestError } from '@/lib/errors'

const debug = Debug('app:managers:account')

const serializeUser = () => {
  return function (user: any, cb: any) {
    cb(null, user._id)
  }
}

const deserializeUser = () => {
  return (id: string, cb: any) => {
    return User.findOne({ _id: id })
      .then(user => {
        cb(null, user)
      })
      .catch(() => {
        cb(null, false)
      })
  }
}

const authenticate = async (email: string, password: string) => {
  email = email.toLowerCase()

  const user = await User.findOne({ email }).select('+hash')

  if (!user) {
    throw new NotFoundError(`User not found`)
  }

  if (!(await user.validatePassword(password))) {
    debug(
      `Email ${email} tried authenticating with a password that doesn't match.`
    )

    throw new UnauthorizedRequestError(`Invalid credentials`)
  }

  return user
}

const AccountManager = {
  serializeUser,
  deserializeUser,
  authenticate,
}

export default AccountManager
