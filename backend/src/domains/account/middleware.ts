import { RequestHandler } from 'express-async-router'

import { BadRequestError, UnauthorizedRequestError } from '@/lib/errors'

export const ensureAuthentication: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) return next(new UnauthorizedRequestError())

  next()
}

export const ensureOrphands: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated())
    return next(
      new BadRequestError(
        'There is an ongoing session. Please logout in order to perform this action.'
      )
    )
  next()
}
