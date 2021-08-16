import { IFieldVertex } from '@codelab/shared/graph'
import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'

/**
 * Metadata for an Edge between an Interface and other types
 */
@ObjectType()
export class Field implements IFieldVertex {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField()
  declare key: string

  @GraphqlField({ nullable: true })
  declare name?: string

  @GraphqlField(() => String, { nullable: true })
  declare description: string | null

  constructor(
    id: string,
    key: string,
    name: string | undefined,
    description: string | null,
  ) {
    this.id = id
    this.key = key
    this.name = name
    this.description = description
  }
}
