import { IField } from '@codelab/shared/core'
import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'

/**
 * Metadata for an Edge between an Interface and other types
 */
@ObjectType()
export class Field implements IField {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField()
  declare key: string

  @GraphqlField({ nullable: true })
  declare name?: string

  @GraphqlField(() => String, { nullable: true })
  declare description?: string

  constructor({ id, key, name, description }: Field) {
    this.id = id
    this.key = key
    this.name = name
    this.description = description
  }
}
