import {
  __FieldCollectionFragment,
  __InterfaceFragment,
  __TypeFragment,
  PrimitiveKind,
} from '@codelab/codegen/graphql'
import { PropertiesSchema } from 'ajv/lib/types/json-schema'
import _ from 'lodash'
import { TypeModels } from '../../types/TypeModels'
import { GetByIdFunction } from './types'

export interface InterfaceToJsonSchemaTransformerOptions {
  /** Max amount of type nesting that's allowed, used to prevent infinite loops. Defaults to 100 */
  maxNesting?: number
}

// Maybe we can create a custom bridge to uniforms instead?

/**
 * Transforms an Interface to a json schema object
 */
export class InterfaceToJsonSchemaTransformer {
  /** Keeps track of recursive transformations while transforming nested types */
  private iteration = 0

  private readonly maxNesting: number

  constructor(options?: InterfaceToJsonSchemaTransformerOptions) {
    this.maxNesting = options?.maxNesting || 100
  }

  /**
   * Transforms an Interface to a json schema object
   * Throws Error if PrimitiveKinds or if the Type object's __typename are not recognized
   */
  transform(intface: __InterfaceFragment) {
    const typesByIdMap = _.keyBy(intface.fieldCollection.types, (i) => i.id)

    return this.interfaceToJsonSchema(intface, (typeId) => typesByIdMap[typeId])
  }

  private interfaceToJsonSchema(
    intface: __InterfaceFragment,
    getType: GetByIdFunction<__TypeFragment>,
  ) {
    return {
      type: 'object',
      properties: this.fieldCollectionToJsonProperties(
        intface.fieldCollection,
        getType,
      ),
    } as any // cast is needed, because we can't verify at compile time that the interface matches the data
  }

  /**
   * Converts a {@link PrimitiveKind} to a valid json schema type
   * or throws an Error if the PrimitiveKind is not recognized
   * Handles: string, integer, number and boolean
   */
  primitiveKindToJsonType(primitiveKind: PrimitiveKind) {
    switch (primitiveKind) {
      case PrimitiveKind.String:
        return 'string'
      case PrimitiveKind.Integer:
        return 'integer'
      case PrimitiveKind.Float:
        return 'number'
      case PrimitiveKind.Boolean:
        return 'boolean'
      default:
        throw new Error('Primitive kind not recognized ' + primitiveKind)
    }
  }

  /**
   * Converts a Type (as in - our domain model Type) to a json schema property
   * or throws an error if the type is not recognized.
   * Since the TypeFragment is flat, doesn't contain any nested types in itself, only references
   * them by id, an external source is needed for them to be transformed too
   *
   * Handles PrimitiveType, ArrayType, EnumType and Interface
   */
  typeToJsonProperty(
    type: __TypeFragment,
    getNestedType: GetByIdFunction<__TypeFragment>,
  ): Record<string, any> {
    this.iteration++

    switch (type.__typename) {
      case TypeModels.PrimitiveType:
        return {
          type: this.primitiveKindToJsonType(type.primitiveKind),
        }
      case TypeModels.ArrayType:
        return {
          type: 'array',
          items: this.typeToJsonProperty(
            getNestedType(type.typeId),
            getNestedType,
          ),
        }
      case TypeModels.EnumType:
        return {
          type: 'string',
          // nullable: true,
          enum: type.allowedValues.map((v) => v.id),
          uniforms: {
            options: type.allowedValues.map((v) => ({
              value: v.id,
              label: v.name,
            })),
          },
        }
      case TypeModels.Interface:
        return {
          type: 'object',
          // nullable: true,
          properties: this.fieldCollectionToJsonProperties(
            {
              fields: type.fieldCollection.fields,
              types: type.fieldCollection.types.map((t) => {
                // The Interface and Array types are only referenced by ID, need to get them from
                // the root types source
                if (
                  t.__typename === 'ArrayType' ||
                  t.__typename === 'Interface'
                ) {
                  return getNestedType(t.id)
                }

                return t
              }),
            },
            getNestedType,
          ),
        }
      default:
        throw new Error('Type not recognized ' + (type as any).__typename)
    }
  }

  fieldCollectionToJsonProperties(
    fieldCollection: __FieldCollectionFragment,
    getType: (typeId: string) => __TypeFragment,
  ) {
    const properties: PropertiesSchema<any> = {}

    for (const field of fieldCollection.fields) {
      const type = getType(field.typeId)
      properties[field.key] = {
        ...(this.typeToJsonProperty(type, getType) as any),
        label: field.name,
      }
    }

    return properties
  }
}
