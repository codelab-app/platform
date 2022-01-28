import { IPageType, TypeKind } from '@codelab/shared/abstract/core'
import { ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

/**
 * The PageType allows selecting a Page in the props form. The value is stored as the pageId
 */
@ObjectType({
  implements: () => [Type],
  description:
    'The PageType allows selecting a Page in the props form. The value is stored as the pageId ',
})
export class PageType extends Type<TypeKind.PageType> implements IPageType {
  constructor(type: Omit<PageType, 'typeKind'>) {
    super({ typeKind: TypeKind.PageType, ...type })
  }
}
