import 'colors'
import { Sequelize } from 'sequelize'
import './associations'
import { sequelize } from './sequelize'
import { Region } from './models/regions'
import { District } from './models/districts'

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

  static async getAllRegions() {
    return await Region.findAll({ raw: true })
  }

  static async getRegionByName(name: string) {
    return await Region.findOne({ where: { name }, raw: true })
  }

  static async getDistrictsByRegion(regionId: number) {
    return await District.findAll({ where: { RegionId: regionId }, raw: true })
  }

  static async getDistrictByName(name: string) {
    return await District.findOne({ where: { name }, raw: true })
  }
}
