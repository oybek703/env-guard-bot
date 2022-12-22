import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Tasks } from './tasks'

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  firstName?: string

  @Column({ nullable: true })
  lastName?: string

  @Column({ nullable: true })
  userName?: string

  @Column()
  telegramUserId: number

  @OneToMany(() => Tasks, task => task.user)
  tasks: Tasks[]
}
