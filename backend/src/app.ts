require('dotenv').config()

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import Debug from 'debug'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import Mongo, { mongoConnectionString } from '@/lib/mongo'

const debug = Debug('app:main')

const PORT = process.env.PORT || '4000'

const app = express()

Mongo.init()

app.use(cors())
app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

app.get('/health', (_, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  debug(`=================================`)
  debug(`App listening on port ${PORT}...`)
  debug(`=================================`)
})
