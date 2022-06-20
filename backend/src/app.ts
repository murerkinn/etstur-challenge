require('dotenv').config()

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import Debug from 'debug'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import accountRouter from '@/domains/account/router'
import AccountManager from '@/domains/account/manager'
import { localStrategy } from '@/domains/account/auth-strategies'
import categoryRouter from '@/domains/category/router'
import Mongo, { mongoConnectionString } from '@/lib/mongo'
import { ExtentableErrorExpressHandler } from '@/lib/errors'
import AclManager from './domains/acl'

const debug = Debug('app:main')

const PORT = process.env.PORT || '4000'

const app = express()

Mongo.init()
AclManager.init()

app.use(
  cors({
    origin: true,
    credentials: Boolean(process.env.HTTP_CORS_CREDENTIALS),
  })
)
app.use(helmet())

app.set('trust proxy', 1)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

passport.use(localStrategy)
passport.serializeUser(AccountManager.serializeUser())
passport.deserializeUser(AccountManager.deserializeUser())

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoConnectionString,
      stringify: false,
    }),
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'thisisasupersecuresecretsecret',
    resave: false,
    cookie: {
      domain:
        process.env.NODE_ENV === 'production'
          ? 'api.myroom24.com'
          : process.env.COOKIE_DOMAIN,
      maxAge: 14 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : true,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.get('/health', (_, res) => res.json({ status: 'ok' }))
app.use('/account', accountRouter)
app.use('/category', categoryRouter)

app.use(ExtentableErrorExpressHandler())

app.listen(PORT, () => {
  debug(`=================================`)
  debug(`App listening on port ${PORT}...`)
  debug(`=================================`)
})
