import { Entity, Column, Index } from 'typeorm';
import { IsEmail } from 'class-validator';
import { BaseEntity } from '../../common/base.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Index({ unique: true })
  @Column({ type: 'varchar' })
  @IsEmail()
  email: number;

  @Column({ type: 'varchar', length: 100 })
  password: string;
}
