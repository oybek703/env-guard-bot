import { DataSource } from 'typeorm'
import { Regions } from './entities/regions'
import { Districts } from './entities/districts'
import { Tasks } from './entities/tasks'
import { Users } from './entities/users'

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  entities: [Regions, Districts, Tasks, Users],
  synchronize: true
})
