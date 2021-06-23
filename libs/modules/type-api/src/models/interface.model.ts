import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { Field, fieldSchema } from './field.model'
import { Type, typeSchema } from './types'

/**
 * Fields and types are in a separate object type, because otherwise we would need
 * to make a separate field resolver for each, which means two queries for the same thing
 */
@ObjectType()
export class FieldCollection {
  @GraphqlField(() => [Field])
  declare fields: Array<Field>

  @GraphqlField(() => [Type], {
    description:
      'Flattened array of all types that are used inside this interface',
  })
  declare types: Array<Type>
}

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
  // Add a library?

  /** Optional, because if we return undefined the field resolver will get it */
  @GraphqlField(() => FieldCollection)
  declare fieldCollection?: FieldCollection
}

export const fieldCollectionSchema: z.ZodSchema<FieldCollection> = z.lazy(() =>
  z.object({
    fields: fieldSchema.array(),
    types: typeSchema.array(),
  }),
)

export const interfaceSchema: z.ZodSchema<Interface> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    fieldCollection: fieldCollectionSchema.optional(),
  }),
)
