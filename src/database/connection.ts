import { DataSource } from 'typeorm'
import { Region } from './entities/region'
import { District } from './entities/district'
import { Task } from './entities/task'
import { User } from './entities/user'

const isDevelopment = process.env.NODE === 'development'

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  entities: [Region, District, Task, User],
  synchronize: isDevelopment
})
