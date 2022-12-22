import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Regions } from './regions'
import { Districts } from './districts'
import { Users } from './users'

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'boolean', default: false })
  finished?: boolean

  @Column({ type: 'text', nullable: true })
  comment?: string

  @Column()
  chatId: number

  @ManyToOne(() => Regions, region => region.tasks)
  region: Regions

  @ManyToOne(() => Districts, district => district.tasks)
  district: Districts

  @ManyToOne(() => Users, user => user.tasks)
  user: Users
}
