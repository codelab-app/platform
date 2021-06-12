import { Field, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

@ObjectType()
export class EnumTypeValue {
  @Field(() => ID)
  declare id: string

  @Field(() => String)
  declare name: string
}

export const enumTypeValueSchema = z.object({
  id: z.string(),
  name: z.string(),
})
