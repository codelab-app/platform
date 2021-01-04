import { Type, classToPlain, plainToClass } from 'class-transformer'
import { CreatePageDto } from './dto/CreatePageDto'
import { SerializedPageDto } from './dto/SerializedPageDto'
import { PageTitle } from './page-title'
import { AggregateRoot, TransformBoth } from '@codelab/backend'

export class Page extends AggregateRoot<SerializedPageDto> {
  @Type(() => PageTitle)
  @TransformBoth(PageTitle)
  declare title: PageTitle

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

  // public static update(request: UpdateUserRequest): User {
  //   return Page.hydrate(request)
  // }

  toPlain() {
    return classToPlain(this) as SerializedPageDto
  }
}
