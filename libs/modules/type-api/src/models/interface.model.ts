import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { Field, fieldSchema } from './field.model'
import { Type, typeSchema } from './types'

@ObjectType()
/**
 * The Types in the interface are flattened down from their
 * recursive structure to a simple array. Everywhere inside the interface,
 * they are referred by their IDs. All the types inside an interface
 * are included inside its types array
 */
export class Interface {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField()
  declare name: string
  //Add a library?

  @GraphqlField(() => [Field])
  declare fields: Array<Field>

  @GraphqlField(() => [Type], {
    description:
      'Flattened array of all types that are used inside this interface',
  })
  declare types: Array<Type>
}

export const interfaceSchema: z.ZodSchema<Interface> = z.object({
  id: z.string(),
  name: z.string(),
  fields: fieldSchema.array(),
  types: typeSchema.array(),
})
