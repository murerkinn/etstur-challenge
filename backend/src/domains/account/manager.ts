import Debug from 'debug'

import User from './models/user'
import Partner, { PartnerRaw } from './models/partner'
import Guest, { GuestRaw } from './models/guest'
import { NotFoundError, UnauthorizedRequestError } from '@/lib/errors'

const debug = Debug('app:managers:account')

const createGuest = async (guestData: GuestRaw) => {
  const guest = await Guest.create({
    email: guestData.email,
    hash: await User.calculateHash(guestData.password),
    firstName: guestData.firstName,
    lastName: guestData.lastName,
  })

  return guest
}

const createPartner = async (partnerData: PartnerRaw) => {
  const partner = await Partner.create({
    email: partnerData.email,
    hash: await User.calculateHash(partnerData.password),
    firstName: partnerData.firstName,
    lastName: partnerData.lastName,
  })

  return partner
}

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
  createGuest,
  createPartner,
  serializeUser,
  deserializeUser,
  authenticate,
}

export default AccountManager
