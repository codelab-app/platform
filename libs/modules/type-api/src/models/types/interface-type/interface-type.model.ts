import { Field, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

@ObjectType()
export class InterfaceType {
  @Field()
  declare interfaceId: string

  @Field()
  declare interfaceName: string
}

export const interfaceTypeSchema: z.ZodSchema<InterfaceType> = z.object({
  interfaceId: z.string(),
  interfaceName: z.string(),
})
