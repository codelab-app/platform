import {
  IEnumType,
  IField,
  IJsonSchemaOptions,
  IPrimitiveType,
  IType,
  PrimitiveTypeKind,
  TypeKind,
} from '@codelab/shared/abstract/core'
import * as _ from 'lodash'
import { TypeTree } from '../TypeTree'

/**
 * Transforms an Interface to a json schema object
 */
export class TypeTreeJsonSchemaTransformer {
  /** Keeps track of recursive transformations while transforming nested types */
  private iteration = 0

  private readonly options: IJsonSchemaOptions

  private readonly formModel: Record<string, any>

  constructor(
    private typeTree: TypeTree,
    options: IJsonSchemaOptions = {},
    formModel?: any,
  ) {
    this.options = {
      maxNesting: 100,
      ...options,
    }

    this.formModel = formModel
  }

  /**
   * Transforms an Interface to a json schema object
   * Throws Error if PrimitiveKinds or if the Type object's __typename are not recognized
   */
  transform() {
    return {
      type: 'object',
      properties: this.fieldsToProperties(this.typeTree.getRootFields()),
    } as any // cast is needed, because we can't verify at compile time that the interface matches the data
  }

  /**
   * Converts a {@link PrimitiveTypeKind} to a valid json schema type
   * or throws an Error if the PrimitiveKind is not recognized
   * Handles: string, integer, number and boolean
   */
  primitiveKindToJsonType(primitiveKind: PrimitiveTypeKind) {
    switch (primitiveKind) {
      case PrimitiveTypeKind.String:
        return 'string'
      case PrimitiveTypeKind.Integer:
        return 'integer'
      case PrimitiveTypeKind.Float:
        return 'number'
      case PrimitiveTypeKind.Boolean:
        return 'boolean'
      default:
        throw new Error('Primitive kind not recognized ' + primitiveKind)
    }
  }

  private createValueFieldSchemaForUnionType(fieldType: IType, field: IField) {
    if (!fieldType) {
      return {}
    }

    const fieldTypeSchema = this.typeToJsonProperty(fieldType, field)
    const label = `"${field.name || field.key}" Value`

    if (
      [TypeKind.ReactNodeType, TypeKind.RenderPropsType].includes(
        fieldType.typeKind,
      )
    ) {
      return {
        id: {
          ...fieldTypeSchema.properties.id,
          label,
        },
      }
    }

    return {
      value: {
        ...fieldTypeSchema,
        label,
      },
    }
  }

  /**
   * Converts a Type (as in - our hooks model Type) to a json schema property
   * or throws an error if the type is not recognized.
   * Since the TypeFragment is flat, doesn't contain any nested types in itself, only references
   * them by id, an external source is needed for them to be transformed too
   */
  typeToJsonProperty(type: IType, field: IField): Record<string, any> {
    this.iteration++

    if (this.iteration > (this.options.maxNesting || 100)) {
      throw new Error(
        'Error while transforming interface to json schema. Type too nested',
      )
    }

    const extra = this.options.jsonPropertiesMapper
      ? this.options.jsonPropertiesMapper(type)
      : {}

    switch (type.typeKind) {
      case TypeKind.ReactNodeType:
      case TypeKind.RenderPropsType:
        return {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              label: field.name || field.key,
              ...extra,
            },
            type: {
              type: 'string',
              uniforms: { component: () => null },
              label: '',
              default: type.id,
            },
          },
          uniforms: { component: null },
          label: '',
        }

      case TypeKind.UnionType: {
        const typesOfUnionType = this.typeTree.getUnionItemTypes(
          type.id,
        ) as Array<IType>

        console.log(typesOfUnionType)

        const fieldLabel = field.name || field.key
        const fieldTypeId = _.get(this.formModel, `${field.key}.type`)

        const fieldType = fieldTypeId
          ? this.typeTree.getTypeById(fieldTypeId)
          : null

        if (fieldTypeId && !fieldType) {
          throw new Error(`Field type not found "${fieldTypeId}"`)
        }

        const valueFieldSchema = fieldType
          ? this.createValueFieldSchemaForUnionType(fieldType, field)
          : {}

        return {
          type: 'object',
          label: '',
          properties: {
            type: {
              isUnionTypeInput: true,
              type: 'string',
              options: typesOfUnionType.map((unionType) => ({
                label: unionType.name,
                value: unionType.id,
              })),
              label: `"${fieldLabel}" Type`,
            },
            ...valueFieldSchema,
          },
        }
      }

      case TypeKind.PrimitiveType:
        return {
          ...extra,
          type: this.primitiveKindToJsonType(
            (type as IPrimitiveType).primitiveKind,
          ),
        }

      case TypeKind.ArrayType: {
        const itemType = this.typeTree.getArrayItemType(type.id)

        if (!itemType) {
          throw new Error(
            `Item type of ArrayType ${type.id} not found in the Type Tree`,
          )
        }

        return {
          ...extra,
          type: 'array',
          items: this.typeToJsonProperty(itemType, field),
        }
      }

      case TypeKind.EnumType: {
        const enumType = type as IEnumType

        return {
          ...extra,
          type: 'string',
          // nullable: true,
          enum: enumType.allowedValues.map((v) => v.id),
          uniforms: {
            options: enumType.allowedValues.map((v) => ({
              value: v.id,
              label: v.name,
            })),
          },
        }
      }

      case TypeKind.InterfaceType:
        return {
          ...extra,
          type: 'object',
          properties: this.fieldsToProperties(this.typeTree.getFields(type.id)),
        } as any // cast is needed, because we can't verify at compile time that the interface matches the data

      case TypeKind.LambdaType:
        return {
          ...extra,
          type: 'string',
        }

      case TypeKind.AppType:
        return {
          ...extra,
          type: 'string',
        }

      case TypeKind.PageType:
        return {
          ...extra,
          type: 'string',
        }

      case TypeKind.ElementType:
        return {
          ...extra,
          type: 'string',
        }

      case TypeKind.ComponentType:
        return {
          ...extra,
          type: 'string',
        }

      case TypeKind.MonacoType:
        return {
          ...extra,
          type: 'string',
        }

      default:
        throw new Error('Type not recognized ' + (type as any).__typename)
    }
  }

  fieldsToProperties(fields: Array<IField>) {
    const properties: Record<string, any> = {}

    for (const field of fields) {
      const type = this.typeTree.getFieldType(field.id)

      if (!type) {
        throw new Error('Missing type')
      }

      const fieldSchema = this.typeToJsonProperty(type, field) as any

      properties[field.key] = {
        ...fieldSchema,
        label:
          'label' in fieldSchema ? fieldSchema.label : field.name || field.key,
      }
    }

    return properties
  }
}
