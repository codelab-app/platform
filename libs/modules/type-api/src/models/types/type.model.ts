import { Field, ID, InterfaceType } from '@nestjs/graphql'
import { z } from 'zod'

@InterfaceType()
export abstract class Type {
  @Field(() => ID)
  declare id: string

  @Field()
  declare name: string

  static Schema = z.object({
    id: z.string(),
    name: z.string(),
  })
}
