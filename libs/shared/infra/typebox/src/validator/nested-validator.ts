/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ObjectLike } from '@codelab/shared/abstract/types'

import {
  type Static,
  type TObject,
  type TSchema,
  type TUnion,
} from '@sinclair/typebox'
import { StandardValidator } from 'typebox-validators'
import { DiscriminatedUnionValidator } from 'typebox-validators/discriminated'

import { IsUnion } from '../schema/is-union'

/**
 * The standard validator checks the top level object properties and handles nested discriminated unions
 *
 * This uses Ajv under the hood, does not work with `TypeRegistry`
 *
 * @throws {ValidationException} When validation fails
 */
export class NestedValidator<S extends TSchema> extends StandardValidator<S> {
  protected override cleanCopyOfValue<VS extends TSchema>(
    schema: Readonly<VS>,
    value: Static<VS>,
  ): Static<VS> {
    // Handle unions first
    if (IsUnion(schema)) {
      const unionSchema = schema as TUnion<Array<TObject>>

      if (unionSchema['discriminantKey']) {
        /**
         * This doesn't remove the extra properties, so we have to do it
         */
        const discriminatedValidator = new DiscriminatedUnionValidator(
          unionSchema,
        )

        const cleanedValue = discriminatedValidator.validateAndCleanCopy(
          value as Readonly<unknown>,
        ) as any

        // Find the matching schema from the union
        const matchedSchema = unionSchema.anyOf.find(
          (subSchema: TObject) =>
            subSchema.properties[unionSchema['discriminantKey']]?.['const'] ===
            cleanedValue[unionSchema['discriminantKey']],
        )

        if (matchedSchema) {
          return this.cleanNestedObject(matchedSchema, cleanedValue)
        }

        return cleanedValue
      } else {
        // Fallback to handling union with the standard validator
        const standardUnionValidator = new StandardValidator(unionSchema)

        return standardUnionValidator.validateAndCleanCopy(
          value as Readonly<unknown>,
        )
      }
    }

    // Handle objects
    if (schema['type'] === 'object' && typeof value === 'object') {
      return this.cleanNestedObject(schema, value) as Static<VS>
    }

    // Handle arrays
    else if (schema['type'] === 'array' && Array.isArray(value)) {
      const itemSchema = schema['items'] as TSchema

      return value.map((item) =>
        this.cleanCopyOfValue(itemSchema, item),
      ) as Static<VS>
    }

    return value as Static<VS>
  }

  private cleanNestedObject<VS extends TSchema>(
    schema: Readonly<VS>,
    value: unknown,
  ): ObjectLike {
    if (!schema['properties'] || typeof value !== 'object' || value === null) {
      return value as ObjectLike
    }

    const cleanedValue: ObjectLike = {}

    // Only include properties defined in the schema
    Object.keys(schema['properties']).forEach((key) => {
      const propertySchema = schema['properties']?.[key] as TSchema
      const propertyValue = (value as ObjectLike)[key]

      cleanedValue[key] = this.cleanCopyOfValue(propertySchema, propertyValue)
    })

    return cleanedValue
  }
}
