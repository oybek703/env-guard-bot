import 'colors'
import { Sequelize } from 'sequelize'
import './associations'
import { sequelize } from './connection'

export class DatabaseManager {
  readonly db: Sequelize

  constructor() {
    this.db = sequelize
  }

  async init() {
    try {
      await this.db.authenticate()
      await this.db.sync()
      console.log(`Successfully connected to database!`.blue.underline)
    } catch (e) {
      if (e instanceof Error) {
        console.error(`Error while connecting to database: ${e.message}`.red.underline)
      }
    }
  }
}
