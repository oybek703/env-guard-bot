import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Regions } from './regions'
import { Tasks } from './tasks'

@Entity()
export class Districts {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => Regions, region => region.districts)
  region: Regions

  @OneToMany(() => Tasks, task => task.district)
  tasks: Tasks[]
}
