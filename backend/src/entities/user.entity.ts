import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  lastname: string

  @Column()
  email: string

  @Column({ name: 'password_hash' })
  passwordHash?: string

  @Column()
  cellphone: string

  @Column()
  activation?: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date
}
