import { AsyncRouter } from 'express-async-router'
import passport from 'passport'
import AccountManager from './manager'

import { ensureAuthentication, ensureOrphands } from './middleware'

const router = AsyncRouter()

router.get('/', ensureAuthentication, req => {
  return req.user
})

router.post('/partner', ensureOrphands, req => {
  return AccountManager.createPartner(req.body)
})

router.post('/guest', ensureOrphands, req => {
  return AccountManager.createGuest(req.body)
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
