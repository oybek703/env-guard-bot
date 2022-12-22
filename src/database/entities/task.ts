import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Region } from './region'
import { District } from './district'
import { User } from './user'

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'boolean', default: false })
  finished?: boolean

  @Column({ type: 'text' })
  comment: string

  @Column()
  chatId: number

  @Column({ nullable: true })
  location?: string

  @Column()
  image: string

  @ManyToOne(() => Region, region => region.tasks)
  region: Region

  @ManyToOne(() => District, district => district.tasks)
  district: District

  @ManyToOne(() => User, user => user.tasks)
  user: User
}
