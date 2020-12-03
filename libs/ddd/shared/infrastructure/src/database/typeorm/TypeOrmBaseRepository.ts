import { BaseRepository } from 'typeorm-transactional-cls-hooked'

export abstract class TypeOrmBaseRepository<
  TypeOrmEntity
> extends BaseRepository<TypeOrmEntity> {
  protected declare entityAlias: string
}
