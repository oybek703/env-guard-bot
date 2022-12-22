import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { District } from './district'
import { Task } from './task'

@Entity({ name: 'regions' })
export class Region {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => District, district => district.region)
  districts: District[]

  @OneToMany(() => Task, task => task.region)
  tasks: Task[]
}
