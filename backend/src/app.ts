require('dotenv').config()

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import Debug from 'debug'
import Mongo from '@/lib/mongo'

const debug = Debug('app:main')

const PORT = process.env.PORT || '4000'

const app = express()

Mongo.init()

app.use(cors())
app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  debug(`=================================`)
  debug(`App listening on port ${PORT}...`)
  debug(`=================================`)
})
