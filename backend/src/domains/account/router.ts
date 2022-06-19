import { AsyncRouter } from 'express-async-router'
import passport from 'passport'

import { ensureAuthentication, ensureOrphands } from './middleware'

const router = AsyncRouter()

router.get('/', ensureAuthentication, req => {
  return req.user
})

router.post(
  '/session',
  ensureOrphands,
  passport.authenticate('local', { failWithError: true }),
  req => {
    return req.user
  }
)

router.delete('/session', ensureAuthentication, req => {
  req.logout()

  return
})

export default router
