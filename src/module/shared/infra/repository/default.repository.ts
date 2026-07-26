import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

export abstract class DefaultRepository<
  T extends ObjectLiteral,
> extends Repository<T> {
  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    super(entity, dataSource.manager);
  }
}
