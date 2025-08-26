import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { UnknownObject } from 'uniforms'

import { isNumber } from 'class-validator'
import invariant from 'invariant'
import { get, isEmpty } from 'radash'
import { joinName } from 'uniforms'
import JSONSchemaBridge from 'uniforms-bridge-json-schema'

const fieldInvariant = (name: string, condition: boolean) => {
  invariant(condition, 'Field not found in schema: "%s"', name)
}

const resolveRef = (reference: string, schema: UnknownObject) => {
  invariant(
    reference.startsWith('#'),
    'Reference is not an internal reference, and only such are allowed: "%s"',
    reference,
  )

  const resolvedReference = reference
    .split('/')
    .filter((part) => part && part !== '#')
    .reduce((definition, next) => definition[next] as UnknownObject, schema)

  invariant(resolvedReference, 'Reference not found in schema: "%s"', reference)

  return resolvedReference
}

const resolveRefIfNeeded = (
  partial: UnknownObject,
  schema: UnknownObject,
): UnknownObject => {
  if (!('$ref' in partial)) {
    return partial
  }

  const { $ref, ...partialWithoutRef } = partial
  return resolveRefIfNeeded(
    // @ts-expect-error The `partial` and `schema` should be typed more precisely.
    Object.assign({}, partialWithoutRef, resolveRef($ref, schema)),
    schema,
  )
}

const partialNames = ['allOf', 'anyOf', 'oneOf']

export class Union {}

interface FieldError {
  /** Provided by Ajv < 8 */
  dataPath?: string
  instancePath?: string
  message?: string
  params?: UnknownObjectLike & {
    missingProperty?: string
  }
}

export interface ValidatorResult {
  details: Array<FieldError>
}

export class CustomBridge extends JSONSchemaBridge {
  model: ObjectLike = {}
  constructor({
    model,
    schema,
    validator,
    ...rest
  }: {
    model: ObjectLike
    schema: UnknownObject
    validator(model: UnknownObject): ValidatorResult | null | undefined
  }) {
    super({ schema: resolveRefIfNeeded(schema, schema), validator, ...rest })
    this.model = model
  }

  getField(name: string) {
    return joinName(null, name).reduce((definition, next, index, array) => {
      const prevName = joinName(array.slice(0, index))
      const nextName = joinName(prevName, next)
      const definitionCache = (this._compiledSchema[nextName] ??= {})
      definitionCache.isRequired = Boolean(
        definition.required?.includes(next) ||
          this._compiledSchema[prevName].required?.includes(next),
      )

      if (definition.type === 'object' && definition.discriminator) {
        fieldInvariant(name, Boolean(definition.oneOf))

        const discriminator = definition.discriminator.propertyName

        const discriminatorValue = get(
          this.model,
          joinName(prevName, discriminator),
        )

        const oneOf =
          definition.oneOf.find(
            (one: ObjectLike) =>
              one.properties[discriminator].const === discriminatorValue,
          ) ?? definition.oneOf[0]

        definition = oneOf.properties[next]

        fieldInvariant(name, Boolean(definition))
      } else if (next === '$' || isNumber(Number(next))) {
        fieldInvariant(name, definition.type === 'array')
        const itemInex = Number(next)
        definition =
          Array.isArray(definition.items) && isNumber(itemInex)
            ? definition.items[itemInex]
            : definition.items
        fieldInvariant(name, Boolean(definition))
      } else if (definition.type === 'object') {
        fieldInvariant(name, Boolean(definition.properties))
        definition = definition.properties[joinName.unescape(next)]
        fieldInvariant(name, Boolean(definition))
      } else {
        let nextFound = false
        partialNames.forEach((partialName) => {
          definition[partialName]?.forEach((partialElement: ObjectLike) => {
            if (!nextFound) {
              partialElement = resolveRefIfNeeded(
                partialElement as UnknownObject,
                this.schema,
              )
              if (next in partialElement.properties) {
                definition = partialElement.properties[next]
                nextFound = true
              }
            }
          })
        })

        fieldInvariant(name, nextFound)
      }

      definition = resolveRefIfNeeded(definition, this.schema)

      // Naive computation of combined type, properties and required.
      const required = definition.required ? definition.required.slice() : []
      const properties = definition.properties
        ? Object.assign({}, definition.properties)
        : {}

      partialNames.forEach((partialName) => {
        definition[partialName]?.forEach((partial: ObjectLike) => {
          partial = resolveRefIfNeeded(partial as UnknownObject, this.schema)

          if (partial.required) {
            required.push(...partial.required)
          }

          Object.assign(properties, partial.properties)

          if (!definitionCache.type && partial.type) {
            definitionCache.type = partial.type
          }
        })
      })

      if (required.length > 0) {
        definitionCache.required = required
      }

      if (!isEmpty(properties)) {
        definitionCache.properties = properties
      }

      return definition
    }, this.schema)
  }

  getType(name: string) {
    const { discriminator } = this.getField(name)

    if (discriminator) {
      return Union
    }

    return super.getType(name)
  }
}
