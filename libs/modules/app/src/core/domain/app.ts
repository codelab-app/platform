import { Type, plainToClass } from 'class-transformer'
import { TypeOrmApp } from '../../../../../backend/src/infrastructure/persistence/typeorm/entity/TypeOrmApp'
import { AppDto } from '../application/useCases/AppDto'
import { AppTitle } from './app-title'
import { AggregateRoot, NOID, TransformBoth, UUID } from '@codelab/backend'

export class App<ID extends UUID | NOID = UUID> extends AggregateRoot<
  AppDto,
  ID
> {
  @Type(() => AppTitle)
  @TransformBoth(AppTitle)
  declare title: AppTitle

  toPersistence(): TypeOrmApp {
    return plainToClass(TypeOrmApp, this.toPlain())
  }
}
