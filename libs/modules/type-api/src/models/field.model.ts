import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { Decorator, decoratorSchema } from './decorators'

@ObjectType()
export class Field {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField()
  declare key: string

  @GraphqlField()
  declare name: string

  @GraphqlField(() => String, { nullable: true })
  declare description: string | null

  @GraphqlField()
  declare typeId: string

  @GraphqlField(() => [Decorator])
  declare decorators: Array<Decorator>
}

export const fieldSchema: z.ZodSchema<Field> = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  typeId: z.string(),
  decorators: decoratorSchema.array(),
})
