import {
  IMonacoType,
  MonacoLanguage,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Type } from './type.model'

registerEnumType(MonacoLanguage, { name: 'MonacoLanguage' })

/**
 * The MonacoType allows selecting a Monaco in the props form. The value is stored as the monacoId
 */
@ObjectType({
  implements: () => [Type],
  description:
    'The MonacoType allows inserting code using Monaco Editor in the props form.',
})
export class MonacoType
  extends Type<TypeKind.MonacoType>
  implements IMonacoType
{
  @Field(() => MonacoLanguage)
  declare language: MonacoLanguage

  constructor({ language, ...type }: Omit<MonacoType, 'typeKind'>) {
    super({ typeKind: TypeKind.MonacoType, ...type })

    this.language = language
  }
}
