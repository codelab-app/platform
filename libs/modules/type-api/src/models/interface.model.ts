import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { Field, fieldSchema } from './field.model'

@ObjectType()
export class Interface {
  @GraphqlField(() => ID)
  declare id: string

  //Add a library?

  @GraphqlField(() => [Field])
  declare fields: Array<Field>
}

export const interfaceSchema = z.object({
  id: z.string(),
  fields: fieldSchema.array(),
})
