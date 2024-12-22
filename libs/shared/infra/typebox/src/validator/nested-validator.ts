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
 */
export class NestedValidator<S extends TSchema> extends StandardValidator<S> {
  protected override cleanCopyOfValue<VS extends TSchema>(
    schema: Readonly<VS>,
    value: unknown,
  ): Static<VS> {
    // Handle discriminated unions first
    if (IsUnion(schema)) {
      const unionSchema = schema as TUnion<Array<TObject>>

      const discriminatedValidator = new DiscriminatedUnionValidator(
        unionSchema,
      )

      const cleanedUnion = discriminatedValidator.validateAndCleanCopy(
        value as Readonly<unknown>,
      )

      // Find the matching schema from the union
      const discriminantKey = unionSchema['discriminantKey'] ?? 'type'
      const discriminantValue = cleanedUnion[discriminantKey]

      const matchedSchema = unionSchema.anyOf.find(
        (subSchema: TObject) =>
          subSchema.properties[discriminantKey]?.['const'] ===
          discriminantValue,
      )

      // After cleaning the union, we need to clean any nested objects within it using the matched schema
      if (matchedSchema) {
        return this.cleanNestedObject(matchedSchema, cleanedUnion) as Static<VS>
      }

      return cleanedUnion as Static<VS>
    }

    // Handle objects
    if (schema['type'] === 'object' && typeof value === 'object') {
      if (!schema['properties']) {
        return value as Static<VS>
      }

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

    // Only include properties that are defined in the schema
    Object.keys(schema['properties']).forEach((key) => {
      if (!schema['properties']) {
        return
      }

      const propertySchema = schema['properties'][key] as TSchema
      const propertyValue = (value as ObjectLike)[key]

      cleanedValue[key] = this.cleanCopyOfValue(propertySchema, propertyValue)
    })

    return cleanedValue
  }
}
