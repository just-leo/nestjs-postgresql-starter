import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { BaseService } from '../../common/base.service';
import { QueryBuilder, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly repo: Repository<UserEntity>,
  ) {
    super();
  }

  public getQueryBuilder(): QueryBuilder<UserEntity> {
    return this.repo.createQueryBuilder('user');
  }

  public create(userDto: CreateUserDto): Promise<UserEntity> {
    // @ts-ignore
    const entity = this.repo.create(userDto);
    return this.repo.save(entity);
  }
}
