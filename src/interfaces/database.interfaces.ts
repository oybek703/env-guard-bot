import { Task } from '../database/entities/task'

export type createTaskOptions = Omit<Task, 'region' | 'district' | 'id' | 'user'> & {
  regionId: number
  districtId: number
  telegramUserId: number
}
