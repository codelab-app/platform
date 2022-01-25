import { IInterfaceType, TypeKind } from '@codelab/shared/abstract/core'
import { Field as GqlField, ObjectType } from '@nestjs/graphql'
import { Field } from '../field/field.model'
import { Type } from './type.model'

/**
 * The fields of the interface are represented by TypeEdges of kind Field in the TypeGraph
 */
@ObjectType({
  implements: () => [Type],
})
export class InterfaceType
  extends Type<TypeKind.InterfaceType>
  implements IInterfaceType
{
  @GqlField(() => [Field])
  fields: Array<Field>

  constructor({ fields, ...type }: Omit<InterfaceType, 'typeKind'>) {
    super({ typeKind: TypeKind.InterfaceType, ...type })
    this.fields = fields
  }
}
