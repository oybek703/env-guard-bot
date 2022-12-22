import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Districts } from './districts'
import { Tasks } from './tasks'

@Entity()
export class Regions {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Districts, district => district.region)
  districts: Districts[]

  @OneToMany(() => Tasks, task => task.region)
  tasks: Tasks[]
}
