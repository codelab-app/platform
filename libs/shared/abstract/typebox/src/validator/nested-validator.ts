/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Static, type TSchema } from '@sinclair/typebox'
import { StandardValidator } from 'typebox-validators'

/**
 * The standard validator only checks the top level object properties
 */
export class NestedValidator<S extends TSchema> extends StandardValidator<S> {
  /** @inheritdoc */
  constructor(schema: S) {
    super(schema)
  }

  protected override cleanCopyOfValue<VS extends TSchema>(
    schema: Readonly<VS>,
    value: Readonly<unknown>,
  ): Static<VS> {
    if (schema['type'] === 'object' && typeof value === 'object') {
      console.log(schema, value)

      if (!schema['properties']) {
        return value as Static<VS>
      }

      const cleanedValue: Record<string, any> = {}

      Object.keys(schema['properties']).forEach((key) => {
        if (!schema['properties']) {
          return
        }

        const propertySchema = schema['properties'][key] as TSchema

        cleanedValue[key] = this.cleanCopyOfValue(
          propertySchema,
          (value as Record<string, any>)[key],
        )
      })

      return cleanedValue as Static<VS>
    } else if (schema['type'] === 'array' && Array.isArray(value)) {
      const itemSchema = schema['items'] as TSchema

      return (value as Array<any>).map((item) =>
        this.cleanCopyOfValue(itemSchema, item),
      ) as Static<VS>
    }

    return value as Static<VS>
  }
}
