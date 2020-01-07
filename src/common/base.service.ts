import { Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import ObjectContaining = jasmine.ObjectContaining;
import { UserDto } from '../modules/user/dto/user.dto';

export abstract class BaseService {

  protected readonly repo: Repository<BaseEntity>;

  abstract getQueryBuilder();

  public async findAll(query): Promise<BaseEntity[]> {
    return await this.repo.find(query);
  }

  public async totalCount(): Promise<number> {
    return await this.repo.count();
  }

  public async findOneBy(properties: any): Promise<BaseEntity> {
    // return this.repo.findOne(properties);
    const condition = [];
    Object.keys(properties).forEach(prop => {
      condition.push(`${prop} = :${prop}`);
    });
    const queryBuilder = this.getQueryBuilder();
    condition.forEach(fieldCondition => {
      queryBuilder
        .andWhere(fieldCondition);
    });
    return await queryBuilder
      .setParameters(properties)
      .getOne();
  }
}
