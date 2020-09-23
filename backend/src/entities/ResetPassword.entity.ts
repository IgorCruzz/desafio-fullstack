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

@Entity({ name: 'resets' })
export class ResetPassword {
  @PrimaryColumn({ name: 'user_id' })
  userId: number

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user?: User

  @Column({ name: 'reset_token' })
  resetToken: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date
}
