import mongoose from 'mongoose'
import Debug from 'debug'

const debug = Debug('app:lib:mongo')

export const mongoConnectionString =
  process.env.MONGO_CONNECTION_STRING ||
  'mongodb://mongo:27017/evently?readPreference=primary&directConnection=true&ssl=false'

const init = async () => {
  try {
    debug(
      `Connecting to mongo db with the connection string: ${mongoConnectionString}`
    )

    await mongoose.connect(mongoConnectionString)

    debug(
      `Successfully connected to mongo db with the connection string: ${mongoConnectionString}`
    )
  } catch (e: any) {
    debug(`Error while trying to connect to mongo db: ${e.message}`)

    throw e
  }
}

const Mongo = {
  init,
}

export default Mongo
