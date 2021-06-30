import { Field, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

@ObjectType()
export class EnumTypeValue {
  @Field(() => ID)
  declare id: string

  @Field(() => String, { nullable: true })
  declare name?: string | null

  @Field(() => String)
  declare value: string

  constructor(id: string, name: string | null, value: string) {
    this.id = id
    this.name = name
    this.value = value
  }

  static Schema = z.object({
    id: z.string(),
    name: z.string().optional().nullable(),
    value: z.string(),
  })
}
