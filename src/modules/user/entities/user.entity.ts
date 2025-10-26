import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { REGISTER_TYPE } from '../constants/user.constant';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsOptional()
  password: string;

  @Column()
  name: string;

  @Column()
  @IsEnum(REGISTER_TYPE)
  register_type: string;

  @Column({ nullable: true })
  image: string;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
