import { ITypeEdge, TypeEdgeKind } from '@codelab/shared/abstract/core'
import {
  Field as GraphqlField,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { Field } from './field.model'

registerEnumType(TypeEdgeKind, { name: 'TypeEdgeKind' })

@InputType()
export class ImportTypeEdgeInput implements ITypeEdge {
  @GraphqlField()
  declare source: string

  @GraphqlField()
  declare target: string

  @GraphqlField(() => TypeEdgeKind)
  declare kind: TypeEdgeKind

  @GraphqlField(() => Field, {
    nullable: true,
    description: 'Empty if kind is not TypeEdgeKind.Field',
  })
  declare field?: Field
}

/**
 * A edge between types. Depending on the kind can mean a couple of things:
 *
 * TypeEdgeKind.Field - it represents a Field object, the field property will contain the metadata
 *
 * TypeEdgeKind.ArrayItem - it represents the generic array item type of an array type. The field property will be empty
 */
@ObjectType({
  description: `A edge between types. Depending on the kind can mean a couple of things:
  TypeEdgeKind.Field - it represents a Field object, the field property will contain the metadata;
  TypeEdgeKind.ArrayItem - it represents the generic array item type of an array type. The field property will be empty`,
})
export class TypeEdge implements ITypeEdge {
  @GraphqlField()
  declare source: string

  @GraphqlField()
  declare target: string

  @GraphqlField(() => TypeEdgeKind)
  declare kind: TypeEdgeKind

  @GraphqlField(() => Field, {
    nullable: true,
    description: 'Empty if kind is not TypeEdgeKind.Field',
  })
  declare field?: Field

  constructor(
    source: string,
    target: string,
    kind: TypeEdgeKind,
    field?: Field,
  ) {
    this.source = source
    this.target = target
    this.kind = kind
    this.field = field
  }
}
