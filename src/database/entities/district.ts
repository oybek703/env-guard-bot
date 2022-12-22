import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Region } from './region'
import { Task } from './task'

@Entity({ name: 'districts' })
export class District {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => Region, region => region.districts)
  region: Region

  @OneToMany(() => Task, task => task.district)
  tasks: Task[]
}
