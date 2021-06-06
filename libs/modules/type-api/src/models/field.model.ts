import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { Decorator, decoratorSchema } from './decorators'
import { Type, typeSchema } from './types'

@ObjectType()
export class Field {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField(() => String)
  declare key: string

  @GraphqlField(() => Type)
  declare type: Type

  @GraphqlField(() => [Decorator])
  declare decorators: Array<Decorator>
}

export const fieldSchema = z.object({
  id: z.string(),
  key: z.string(),
  type: typeSchema,
  decorators: decoratorSchema.array(),
})
