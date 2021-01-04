import { Type, classToPlain, plainToClass } from 'class-transformer'
import { TypeOrmApp } from '../../../../../backend/src/infrastructure/persistence/typeorm/entity/TypeOrmApp'
import { SerializedAppDto } from '../../../../user/src/core/domain/dto/SerializedAppDto'
import { AppTitle } from './app-title'
import { AggregateRoot, TransformBoth } from '@codelab/backend'

export class App extends AggregateRoot<SerializedAppDto> {
  @Type(() => AppTitle)
  @TransformBoth(AppTitle)
  declare title: AppTitle

  public static hydrate(props: SerializedAppDto) {
    const app = plainToClass(App, props)

    return app
  }

  public static create(request: any): App {
    const app = App.hydrate(request)

    return app
  }

  toPersistence(): TypeOrmApp {
    return plainToClass(TypeOrmApp, this.toPlain())
  }

  toPlain() {
    return classToPlain(this) as SerializedAppDto
  }
}
