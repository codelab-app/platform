import { ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

/**
 * The PageType allows selecting a Page in the props form. The value is stored as the lambdaId
 */
@ObjectType({
  implements: () => [Type],
  description:
    'The PageType allows selecting a Page in the props form. The value is stored as the lambdaId ',
})
export class PageType implements Type {
  declare id: string

  declare name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}
