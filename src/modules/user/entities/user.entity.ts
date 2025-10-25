import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';

enum REGISTER_TYPE {
  platform = 'platform',
  google = 'google',
  github = 'github',
}

@Entity('user')
export class UserEntiny {
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

  @Column({ default: null })
  image: string;
}
