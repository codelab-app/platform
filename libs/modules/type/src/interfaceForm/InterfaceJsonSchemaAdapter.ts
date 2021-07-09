import {
  __FieldCollectionFragment,
  __InterfaceFragment,
  __TypeFragment,
  PrimitiveKind,
} from '@codelab/codegen/graphql'
import { JSONSchemaType } from 'ajv'
import { PropertiesSchema } from 'ajv/lib/types/json-schema'
import _ from 'lodash'
import { TypeModels } from '../types/TypeModels'

// Maybe we can create a custom bridge to uniforms instead?
export class InterfaceJsonSchemaAdapter {
  static getJsonTypeFromPrimitiveKind(primitiveKind: PrimitiveKind) {
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

  static toJsonProperty(
    type: __TypeFragment,
    getType: (typeId: string) => __TypeFragment,
  ): Record<string, any> {
    switch (type.__typename) {
      case TypeModels.PrimitiveType:
        return {
          type: InterfaceJsonSchemaAdapter.getJsonTypeFromPrimitiveKind(
            type.primitiveKind,
          ),
          // nullable: true,
        }
      case TypeModels.ArrayType:
        return {
          type: 'array',
          // nullable: true,
          // This is a bit confusing, because the variable names are alike
          // but it means basically: get the array item type from the root types array
          // and map it to a json property
          items: InterfaceJsonSchemaAdapter.toJsonProperty(
            getType(type.typeId),
            getType,
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
          properties: InterfaceJsonSchemaAdapter.toJsonProperties(
            {
              fields: type.fieldCollection.fields,
              types: type.fieldCollection.types.map((t) => {
                // The Interface and Array types are only referenced by ID, need to get them from
                // the root types array
                if (
                  t.__typename === 'ArrayType' ||
                  t.__typename === 'Interface'
                ) {
                  return getType(t.id)
                }

                return t
              }),
            },
            getType,
          ),
        }
      default:
        throw new Error('Type not recognized ' + (type as any).__typename)
    }
  }

  static toJsonProperties(
    fieldCollection: __FieldCollectionFragment,
    getType: (typeId: string) => __TypeFragment,
  ) {
    const properties: PropertiesSchema<any> = {}

    for (const field of fieldCollection.fields) {
      const type = getType(field.typeId)
      properties[field.key] = {
        ...(InterfaceJsonSchemaAdapter.toJsonProperty(type, getType) as any),
        label: field.name,
      }
    }

    return properties
  }

  static toJsonSchema<TData>(
    int: __InterfaceFragment,
    getType?: (typeId: string) => __TypeFragment,
  ): JSONSchemaType<TData> {
    if (!getType) {
      const typesByIdMap = _.keyBy(int.fieldCollection.types, (i) => i.id)
      getType = (typeId) => typesByIdMap[typeId]
    }

    return {
      type: 'object',
      properties: InterfaceJsonSchemaAdapter.toJsonProperties(
        int.fieldCollection,
        getType,
      ),
    } as any // cast is needed, because we can't verify at compile time that the interface matches TData
  }
}
