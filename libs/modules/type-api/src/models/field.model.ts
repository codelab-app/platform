import { Dgraph__FieldFragment } from '@codelab/codegen/dgraph'
import { Field as GraphqlField, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'
import {
  ArrayLengthValidator,
  Decorator,
  decoratorSchema,
  MinMaxValidator,
  RequiredValidator,
} from './decorators'
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

  @GraphqlField(() => [Decorator])
  declare decorators: Array<Decorator>

  @GraphqlField(() => Interface)
  declare interface: Interface | { id: string }

  static fromGql(gqlField: Dgraph__FieldFragment) {
    const field = new Field()

    field.id = gqlField.id
    field.key = gqlField.key
    field.name = gqlField.name
    field.description = gqlField.description || null
    field.typeId = gqlField.type.id
    field.decorators =
      gqlField.decorators
        ?.map((d) => {
          if (!d) {
            return null
          }

          switch (d.__typename) {
            case 'ArrayLengthValidator':
              return new ArrayLengthValidator(
                d.id,
                d.min || null,
                d.max || null,
              )
            case 'MinMaxValidator':
              return new MinMaxValidator(d.id, d.min || null, d.max || null)
            case 'RequiredValidator':
              return new RequiredValidator(d.id, d.isRequired)
          }
        })
        .filter((d): d is ArrayLengthValidator => !!d) || []
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
      decorators: decoratorSchema.array(),
      interface: interfaceSchema.or(z.object({ id: z.string() })),
    }),
  )
}

export const fieldSchema = Field.Schema
