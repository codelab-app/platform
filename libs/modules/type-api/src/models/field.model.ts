import { Dgraph__FieldFragment } from '@codelab/codegen/dgraph'
import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import { Interface, interfaceSchema } from './interface.model'

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

  @GraphqlField(() => Interface)
  declare interface: Interface | { id: string }

  static fromGql(gqlField: Dgraph__FieldFragment) {
    const field = new Field()

    field.id = gqlField.id
    field.key = gqlField.key
    field.name = gqlField.name
    field.description = gqlField.description || null
    field.typeId = gqlField.type.id
    field.interface = gqlField.interface

    return field
  }

  static Schema: z.ZodSchema<Field> = z.lazy(() =>
    z.object({
      id: z.string(),
      key: z.string(),
      name: z.string(),
      description: z.string().nullable(),
      typeId: z.string(),
      interface: interfaceSchema.or(z.object({ id: z.string() })),
    }),
  )
}

export const fieldSchema = Field.Schema
