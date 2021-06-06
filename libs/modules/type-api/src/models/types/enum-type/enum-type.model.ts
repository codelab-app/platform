import { Field, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { EnumTypeValue, enumTypeValueSchema } from './enum-type-value.model'

/**
 * Allows only a set of values
 */
@ObjectType()
export class EnumType {
  @Field(() => ID)
  declare id: string

  @Field(() => [EnumTypeValue])
  declare allowedValues: Array<EnumTypeValue>
}

export const enumTypeSchema = z.object({
  id: z.string(),
  allowedValues: enumTypeValueSchema.array(),
})
