import { IEdge, IField, typeEdgeIsField } from '@codelab/shared/abstract/core'
import {
  Field as GraphqlField,
  InterfaceType,
  IntersectionType,
  ObjectType,
} from '@nestjs/graphql'
import { Field } from './field/field.model'

@InterfaceType({
  resolveType: (edge) => (typeEdgeIsField(edge) ? FieldTypeEdge : BaseTypeEdge),
})
export class TypeEdge implements IEdge {
  @GraphqlField()
  declare source: string

  @GraphqlField()
  declare target: string
}

@ObjectType({ implements: TypeEdge })
export class BaseTypeEdge extends TypeEdge {}

@ObjectType({ implements: TypeEdge })
export class FieldTypeEdge
  extends IntersectionType(BaseTypeEdge, Field)
  implements IField {}
