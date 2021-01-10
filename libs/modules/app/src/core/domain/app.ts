import { Type, plainToClass } from 'class-transformer'
import { TypeOrmApp } from '../../../../../backend/src/infrastructure/persistence/typeorm/entity/TypeOrmApp'
import { SerializedAppDto } from '../../../../user/src/core/domain/dto/SerializedAppDto'
import { AppTitle } from './app-title'
import { AggregateRoot, NOID, TransformBoth, UUID } from '@codelab/backend'

export class App<ID extends UUID | NOID = UUID> extends AggregateRoot<
  SerializedAppDto,
  ID
> {
  @Type(() => AppTitle)
  @TransformBoth(AppTitle)
  declare title: AppTitle

  toPersistence(): TypeOrmApp {
    return plainToClass(TypeOrmApp, this.toPlain())
  }
}
