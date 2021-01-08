import { Exclude, Type, classToPlain, plainToClass } from 'class-transformer'
import { App } from '../../../../app/src/core/domain/app'
import { PageCreatedEvent } from '../application/useCases/createPage/PageCreatedEvent'
import { CreatePageDto } from './dto/CreatePageDto'
import { SerializedPageDto } from './dto/SerializedPageDto'
import { PageTitle } from './page-title'
import { AggregateRoot, TransformBoth, TypeOrmPage } from '@codelab/backend'

export class Page extends AggregateRoot<SerializedPageDto> {
  @Type(() => PageTitle)
  @TransformBoth(PageTitle)
  declare title: PageTitle

  /* Without this crashes the app with TypeError
   *  const { constructor } = Object.getPrototypeOf(event);
   *  TypeError: Cannot convert undefined or null to object
   *  from default-get-event-name.js at cqrs/dist/helpers
   *  When using EventHandler to listen to an event, this object ends up with
   *  a publish property which crashes NodeJS during classToPlain conversion
   */
  @Exclude()
  publish: any

  createPage(app: App) {
    this.apply(new PageCreatedEvent(app, this))
  }

  /**
   * Used for instantiating a User object
   * @param props
   */
  public static hydrate(props: SerializedPageDto) {
    return plainToClass(Page, props)
  }

  /**
   * Used for creating User
   * @param request
   */
  public static create(request: CreatePageDto): Page {
    return Page.hydrate(request)
  }

  toPersistence(): TypeOrmPage {
    return plainToClass(TypeOrmPage, this.toPlain())
  }

  toPlain() {
    /* Without this crashes the app with TypeError
     *  const { constructor } = Object.getPrototypeOf(event);
     *  TypeError: Cannot convert undefined or null to object
     *  from default-get-event-name.js at cqrs/dist/helpers
     *  When using EventHandler to listen to an event, this object ends up with
     *  a publish property which crashes NodeJS during classToPlain conversion
     *  We can either delete the property from the object before conversion
     *  or we use @Exclude above to exclude the publish property
     */
    // delete this.publish
    return classToPlain(this) as SerializedPageDto
  }
}
