import {
  IBaseTypeVertexInput,
  TypeKind,
  VertexValueObject,
} from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'

/**
 * Input is used for importing type graph data
 */
@InputType({ isAbstract: true })
export class ImportTypeInput<TTypeKind extends TypeKind>
  implements VertexValueObject, IBaseTypeVertexInput<TTypeKind>
{
  @Field()
  declare name: string

  @Field(() => TypeKind)
  declare typeKind: TTypeKind

  constructor(typeKind: TTypeKind) {
    this.typeKind = typeKind
  }
}
