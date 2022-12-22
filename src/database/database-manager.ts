import 'colors'
import { DataSource, Repository } from 'typeorm'
import { dataSource } from './connection'
import { Region } from './entities/region'
import { District } from './entities/district'
import { Task } from './entities/task'
import { User } from './entities/user'
import { User as TelegramUser } from 'telegraf/typings/core/types/typegram'

type createTaskOptions = Omit<Task, 'region' | 'district' | 'id' | 'user'> & {
  regionId: number
  districtId: number
  telegramUserId: number
}

export class DatabaseManager {
  readonly db: DataSource
  public readonly regionRepository: Repository<Region>
  public readonly districtRepository: Repository<District>
  public readonly taskRepository: Repository<Task>
  public readonly userRepository: Repository<User>

  constructor() {
    this.db = dataSource
    this.regionRepository = this.db.getRepository(Region)
    this.districtRepository = this.db.getRepository(District)
    this.taskRepository = this.db.getRepository(Task)
    this.userRepository = this.db.getRepository(User)
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

  async saveUser(user: TelegramUser) {
    const existingUser = await this.userRepository.findOne({ where: { telegramUserId: user.id } })
    if (!existingUser) {
      const newUser = new User()
      newUser.userName = user.username
      newUser.telegramUserId = user.id
      newUser.lastName = user.last_name
      newUser.firstName = user.first_name
      await this.userRepository.save(newUser)
    } else {
      if (existingUser.userName !== user.username) {
        existingUser.userName = user.username
        await this.userRepository.save(existingUser)
      }
    }
  }

  getAllRegions() {
    return this.regionRepository.find()
  }

  findRegionByName(regionName: string) {
    return this.regionRepository.findOne({ where: { name: regionName } })
  }

  getDistrictsByRegion(regionId: number) {
    return this.districtRepository.find({
      where: {
        region: {
          id: regionId
        }
      }
    })
  }

  getDistrictByName(districtName: string) {
    return this.districtRepository.findOne({ where: { name: districtName } })
  }

  getRegionById(regionId: number) {
    return this.regionRepository.findOne({ where: { id: regionId } })
  }

  getDistrictById(districtId: number) {
    return this.districtRepository.findOne({ where: { id: districtId } })
  }

  getUserByTelegramId(telegramUserId: number) {
    return this.userRepository.findOne({ where: { telegramUserId } })
  }

  async createTask(options: createTaskOptions) {
    const region = await this.getRegionById(options.regionId)
    const district = await this.getDistrictById(options.districtId)
    const user = await this.getUserByTelegramId(options.telegramUserId)
    if (region && district && user) {
      const newTask = new Task()
      newTask.image = options.image
      newTask.comment = options.comment
      newTask.chatId = options.chatId
      newTask.location = options.location
      newTask.region = region
      newTask.district = district
      newTask.user = user
      await this.taskRepository.save(newTask)
    }
  }

  getTasksByArea({ districtId, regionId }: Pick<createTaskOptions, 'districtId' | 'regionId'>) {
    return this.taskRepository
      .createQueryBuilder('task')
      .innerJoinAndSelect('task.region', 'region', 'region.id = :regionId', { regionId })
      .innerJoinAndSelect('task.district', 'district', 'district.id = :districtId', {
        districtId
      })
      .select([
        'comment',
        'region.name AS "regionName"',
        'district.name AS "districtName"',
        'task.finished AS "finished"',
        'task.createdAt AS "createdAt"'
      ])
      .getRawMany()
  }
}
