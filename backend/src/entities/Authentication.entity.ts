import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'authentications' })
export class Authentication {
  @PrimaryColumn({ name: 'user_id' })
  userId: number

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user?: User

  @Column()
  token: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date
}
