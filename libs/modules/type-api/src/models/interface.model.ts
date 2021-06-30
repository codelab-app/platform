import { Field as GraphqlField, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { Field } from './field.model'
import { Type } from './types/type.model'

/**
 * The Types in the interface are flattened down from their
 * recursive structure to a simple array. Everywhere inside the interface,
 * they are referred by their IDs. All the types inside an interface
 * are included inside its types array
 */
@ObjectType({
  implements: () => [Type],
})
// The generic avoids a type recursion error
export class Interface<TFieldCollection = FieldCollection | undefined>
  implements Type
{
  declare id: string

  declare name: string

  // Add a library?

  /** Optional, because if we return undefined the field resolver will get it */
  @GraphqlField(() => FieldCollection)
  declare fieldCollection?: TFieldCollection

  constructor(id: string, name: string, fieldCollection: TFieldCollection) {
    this.id = id
    this.name = name
    this.fieldCollection = fieldCollection
  }
}

export const interfaceSchema: z.ZodSchema<Interface> = z.lazy(() =>
  Type.Schema.extend({
    fieldCollection: fieldCollectionSchema.optional(),
  }),
)

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

  constructor(fields: Array<Field>, types: Array<Type>) {
    this.fields = fields
    this.types = types
  }
}

export const fieldCollectionSchema: z.ZodSchema<FieldCollection> = z.lazy(() =>
  z.object({
    fields: Field.Schema.array(),
    types: Type.Schema.array(),
  }),
)
