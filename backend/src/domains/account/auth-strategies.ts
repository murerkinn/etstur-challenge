import { Strategy as LocalStrategy } from 'passport-local'
import AccountManager from './manager'

export const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await AccountManager.authenticate(email, password)

      done(null, user)
    } catch (err) {
      done(err)
    }
  }
)
