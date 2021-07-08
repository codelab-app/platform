import { Field, fieldSchema } from '@codelab/modules/type-api'
import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { PropValue, propValueSchema } from '../values'

@ObjectType()
export class Prop {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField(() => Field)
  // The field resolver will get it if we return just  the ID
  declare field: Field | Pick<Field, 'id'>

  @GraphqlField(() => PropValue, { nullable: true })
  declare value?: typeof PropValue | null

  static Schema = z.object({
    id: z.string(),
    field: fieldSchema.or(z.object({ id: z.string() })),
    value: propValueSchema.optional().nullable(),
  })

  constructor({ value, field, id }: Prop) {
    this.id = id
    this.field = field
    this.value = value
  }
}


