import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  DeleteDateColumn
} from 'typeorm'

import { MaxLength, IsEmail, MinLength } from 'class-validator'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @MaxLength(45, { message: 'The name can only have 45 characters' })
  name: string;

  @Column()
  @MaxLength(45, { message: 'The name can only have 45 characters' })
  lastname: string;

  @Column({
    unique: true
  })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  @MinLength(11, {
    message: 'phone should have 11 characters or more'
  })
  phone: string;

  @DeleteDateColumn()
  deleted: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User
