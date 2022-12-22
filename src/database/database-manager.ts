import 'colors'
import { DataSource, Repository } from 'typeorm'
import { dataSource } from './connection'
import { Regions } from './entities/regions'
import { Districts } from './entities/districts'

export class DatabaseManager {
  readonly db: DataSource
  private readonly regionsRepository: Repository<Regions>
  private readonly districtsRepository: Repository<Districts>

  constructor() {
    this.db = dataSource
    this.regionsRepository = this.db.getRepository(Regions)
    this.districtsRepository = this.db.getRepository(Districts)
  }

  async init() {
    try {
      await this.db.initialize()
      console.log(`Successfully connected to database!`.blue.underline)
    } catch (e) {
      if (e instanceof Error) {
        console.error(`Error while connecting to database: ${e.message}`.red.underline)
      }
    }
  }

  getAllRegions() {
    return this.regionsRepository.find()
  }

  findRegionByName(regionName: string) {
    return this.regionsRepository.findOne({ where: { name: regionName } })
  }

  getDistrictsByRegion(regionId: number) {
    return this.districtsRepository.find({
      where: {
        region: {
          id: regionId
        }
      }
    })
  }
}
