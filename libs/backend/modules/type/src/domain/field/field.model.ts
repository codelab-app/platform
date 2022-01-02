import { IField } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
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

  @GraphqlField(() => String, { nullable: true })
  declare name?: Nullable<string>

  @GraphqlField(() => String, { nullable: true })
  declare description?: Nullable<string>

  @GraphqlField()
  declare target: string

  @GraphqlField()
  declare source: string

  constructor({ id, key, name, description, target, source }: Field) {
    this.id = id
    this.key = key
    this.name = name
    this.description = description
    this.target = target
    this.source = source
  }
}
