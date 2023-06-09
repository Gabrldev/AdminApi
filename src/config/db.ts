import 'dotenv/config'

import { connect } from 'mongoose'

async function connectToDatabase (): Promise<void> {
  const DB_URL = process.env.DB_URL as string
  await connect(DB_URL)
}

export default connectToDatabase
