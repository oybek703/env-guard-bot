import 'colors'
import { DataSource, Repository } from 'typeorm'
import { dataSource } from './connection'
import { Region } from './entities/region'
import { District } from './entities/district'
import { Task } from './entities/task'
import { User } from './entities/user'
import { User as TelegramUser } from 'telegraf/typings/core/types/typegram'
import { ITaskByArea } from '../interfaces/bot.interfaces'
import { createTaskOptions } from '../interfaces/database.interfaces'

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

  getRegionByName(regionName: string) {
    return this.regionRepository.findOneBy({ name: regionName })
  }

  getDistrictsByRegion(regionId: number) {
    return this.districtRepository.findBy({ region: { id: regionId } })
  }

  getDistrictByName(districtName: string) {
    return this.districtRepository.findOneBy({ name: districtName })
  }

  getRegionById(regionId: number) {
    return this.regionRepository.findOneBy({ id: regionId })
  }

  getDistrictById(districtId: number) {
    return this.districtRepository.findOneBy({ id: districtId })
  }

  getUserByTelegramId(telegramUserId: number) {
    return this.userRepository.findOneBy({ telegramUserId })
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

  getTasksByArea({
    districtId,
    regionId
  }: Pick<createTaskOptions, 'districtId' | 'regionId'>): Promise<ITaskByArea[]> {
    return this.taskRepository
      .createQueryBuilder('task')
      .innerJoinAndSelect('task.region', 'region', 'region.id = :regionId', { regionId })
      .innerJoinAndSelect('task.district', 'district', 'district.id = :districtId', {
        districtId
      })
      .where('task.finished = :finished', { finished: false })
      .select([
        'task.id AS "id"',
        'comment',
        'image',
        'task.chatId AS "chatId"',
        'region.name AS "regionName"',
        'district.name AS "districtName"',
        'task.finished AS "finished"',
        'task.createdAt AS "createdAt"'
      ])
      .getRawMany()
  }

  getTaskWithArea(taskId: number): Promise<ITaskByArea | undefined> {
    return this.taskRepository
      .createQueryBuilder('task')
      .innerJoin('task.region', 'region')
      .innerJoinAndSelect('task.district', 'district')
      .innerJoinAndSelect('task.user', 'user')
      .where('task.id = :taskId', { taskId })
      .select([
        'task.id AS "id"',
        'comment',
        'image',
        'task.chatId AS "chatId"',
        'region.name AS "regionName"',
        'district.name AS "districtName"',
        'task.finished AS "finished"',
        'task.createdAt AS "createdAt"'
      ])
      .getRawOne()
  }

  getRegionTasksCount(regionId: number) {
    return this.taskRepository
      .createQueryBuilder('task')
      .where('task.regionId = :regionId', { regionId })
      .getCount()
  }

  getRegionFinishedTasksCount(regionId: number) {
    return this.taskRepository
      .createQueryBuilder('task')
      .where('task.regionId = :regionId', { regionId })
      .andWhere('task.finished = :finished', { finished: true })
      .getCount()
  }

  getUserTasksCount(chatId: number) {
    return this.taskRepository
      .createQueryBuilder('task')
      .where('task.chatId = :chatId', { chatId })
      .getCount()
  }

  getUserFinishedTasksCount(chatId: number) {
    return this.taskRepository
      .createQueryBuilder('task')
      .where('task.chatId = :chatId', { chatId })
      .andWhere('task.finished = :finished', { finished: true })
      .getCount()
  }

  getDistrictsTasksCount(districtId: number) {
    return this.taskRepository
      .createQueryBuilder('task')
      .where('task.districtId = :districtId', { districtId })
      .getCount()
  }

  getDistrictsFinishedTasksCount(districtId: number) {
    return this.taskRepository
      .createQueryBuilder('task')
      .where('task.districtId = :districtId', { districtId })
      .andWhere('task.finished = :finished', { finished: true })
      .getCount()
  }

  async markTaskAsFinished(taskId: number) {
    await this.taskRepository
      .createQueryBuilder()
      .where('tasks.id = :taskId', { taskId })
      .update()
      .set({ finished: true })
      .execute()
  }
}
