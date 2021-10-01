import {
  IEnumTypeVertex,
  IField,
  IJsonSchemaOptions,
  IPrimitiveTypeVertex,
  ITypeVertex,
  PrimitiveKind,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { TypeTree } from '../TypeTree'

/**
 * Transforms an Interface to a json schema object
 */
export class TypeTreeJsonSchemaTransformer {
  /** Keeps track of recursive transformations while transforming nested types */
  private iteration = 0

  private readonly options: IJsonSchemaOptions

  constructor(
    private typeTree: TypeTree<any, any>,
    options: IJsonSchemaOptions = {},
  ) {
    this.options = {
      maxNesting: 100,
      ...options,
    }
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
   */
  typeToJsonProperty(type: ITypeVertex, field: IField): Record<string, any> {
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

      case TypeKind.PrimitiveType:
        return {
          ...extra,
          type: this.primitiveKindToJsonType(
            (type as IPrimitiveTypeVertex).primitiveKind,
          ),
        }

      case TypeKind.ArrayType: {
        const itemType = this.typeTree.getArrayItemType(type.id)

        if (!itemType) {
          throw new Error(
            `Item type of ArayType ${type.id} not found in the Type Tree`,
          )
        }

        return {
          ...extra,
          type: 'array',
          items: this.typeToJsonProperty(itemType, field),
        }
      }

      case TypeKind.EnumType: {
        const enumType = type as IEnumTypeVertex

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

      default:
        throw new Error('Type not recognized ' + (type as any).__typename)
    }
  }

  fieldsToProperties(fields: Array<IField>) {
    const properties: Record<string, any> = {}

    for (const field of fields) {
      const type = this.typeTree.getFieldType(field.id)
      const fieldSchema = this.typeToJsonProperty(type, field) as any
      console.log({ fieldSchema })

      properties[field.key] = {
        ...fieldSchema,
        label:
          'label' in fieldSchema ? fieldSchema.label : field.name || field.key,
      }
    }

    return properties
  }
}
