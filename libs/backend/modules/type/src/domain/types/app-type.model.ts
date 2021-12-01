import { IAppType, TypeKind } from '@codelab/shared/abstract/core'
import { ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

/**
 * The AppType allows selecting a App in the props form. The value is stored as the appId
 */
@ObjectType({
  implements: () => [Type],
  description:
    'The AppType allows selecting a App in the props form. The value is stored as the appId ',
})
export class AppType extends Type<TypeKind.AppType> implements IAppType {
  constructor({ id, name }: Pick<AppType, 'id' | 'name'>) {
    super(TypeKind.AppType)

    this.id = id
    this.name = name
  }
}
