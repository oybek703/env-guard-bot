import 'colors'
import { Sequelize } from 'sequelize'
import './associations'
import { sequelize } from './sequelize'

export class DatabaseManager {
  readonly db: Sequelize

  constructor() {
    this.db = sequelize
  }

  async init(): Promise<Sequelize | undefined> {
    try {
      await this.db.authenticate()
      await this.db.sync()
      console.log(`Successfully connected to database!`.blue.underline)
      return this.db
    } catch (e) {
      if (e instanceof Error) {
        console.error(`Error while connecting to database: ${e.message}`.red.underline)
      }
    }
  }
}
