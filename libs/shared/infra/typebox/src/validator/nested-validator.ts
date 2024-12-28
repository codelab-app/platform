/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ObjectLike } from '@codelab/shared/abstract/types'

import {
  type Static,
  type TAnySchema,
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
  override assert(
    value: unknown,
    message?: string,
  ): asserts value is Static<S> {
    return super.assert(value as Readonly<unknown>, message)
  }

  /**
   * @throws {ValidationException}
   */
  public override validate(values: unknown): Static<S> {
    return this.withErrorLogging(values, () =>
      super.validate(values as Readonly<unknown>),
    )
  }

  /**
   * @throws {ValidationException}
   */
  public override validateAndClean(values: unknown): Static<S> {
    return this.withErrorLogging(values, () =>
      super.validateAndCleanCopy(values as Readonly<unknown>),
    )
  }

  protected override cleanCopyOfValue<VS extends TSchema>(
    schema: Readonly<VS>,
    value: unknown,
  ): Static<VS> {
    // console.log(value)
    // cLog(schema)

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
        )

        // Find the matching schema from the union
        const matchedSchema = unionSchema.anyOf.find(
          (subSchema: TObject) =>
            subSchema.properties[unionSchema['discriminantKey']]?.['const'] ===
            cleanedValue[unionSchema['discriminantKey']],
        )

        if (matchedSchema) {
          return this.cleanNestedObject(
            matchedSchema,
            cleanedValue,
          ) as Static<VS>
        }

        return cleanedValue as Static<VS>
      } else {
        // Fallback to handling union with the standard validator
        const standardUnionValidator = new StandardValidator(unionSchema)

        return standardUnionValidator.validateAndCleanCopy(
          value as Readonly<unknown>,
        ) as Static<VS>
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

  /**
   * Wraps a validation function with error logging
   */
  private withErrorLogging<T>(values: unknown, validationFn: () => T): T {
    try {
      return validationFn()
    } catch (error) {
      console.error('Validation error for values:', values)
      throw error
    }
  }
}
