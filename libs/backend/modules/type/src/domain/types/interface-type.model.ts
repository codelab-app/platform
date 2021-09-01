import { DgraphField } from '@codelab/backend/infra'
import { IInterfaceTypeVertex } from '@codelab/shared/core'
import { TypeKind } from '@codelab/shared/enums'
import { Field as GraphqlField, ObjectType } from '@nestjs/graphql'
import { Field } from '../field.model'
import { Type } from './type.model'

/**
 * The fields of the interface are represented by TypeEdges of kind Field in the TypeGraph
 */
@ObjectType({
  implements: () => [Type],
})
export class InterfaceType
  extends Type<TypeKind.InterfaceType>
  implements IInterfaceTypeVertex
{
  @GraphqlField(() => [Field])
  declare fields: Array<DgraphField>

  constructor({
    id,
    name,
    fields,
  }: Pick<InterfaceType, 'id' | 'name' | 'fields'>) {
    super(TypeKind.InterfaceType)

    this.id = id
    this.name = name
    this.fields = fields
  }
}
