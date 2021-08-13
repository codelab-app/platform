import {
  __FieldFragment,
  __TypeFragment,
  PrimitiveKind,
} from '@codelab/shared/codegen/graphql'
import { PropertiesSchema } from 'ajv/lib/types/json-schema'
import { TypeModels } from '../../types'
import { ITypeTree } from '../../typeTree'
import { SelectComponent } from '../fields/SelectComponent'
import { getSelectElementComponent } from '../fields/SelectElement'
import { SelectLambda } from '../fields/SelectLambda'

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

  constructor(
    private typeTree: ITypeTree,
    options?: InterfaceToJsonSchemaTransformerOptions,
  ) {
    this.maxNesting = options?.maxNesting || 100
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
   *
   * Handles PrimitiveType, ArrayType, EnumType and Interface
   */
  // TODO move this to shared/graph/type
  typeToJsonProperty(type: __TypeFragment): Record<string, any> {
    this.iteration++

    if (this.iteration > this.maxNesting) {
      throw new Error(
        'Error while transforming interface to json schema. Type too nested',
      )
    }

    switch (type.__typename) {
      case TypeModels.PrimitiveType:
        return {
          type: this.primitiveKindToJsonType(type.primitiveKind),
        }

      case TypeModels.ArrayType: {
        const itemType = this.typeTree.getArrayItemType(type.id)

        if (!itemType) {
          throw new Error(
            `Item type of ArayType ${type.id} not found in the Type Tree`,
          )
        }

        return {
          type: 'array',
          // todo cast
          items: this.typeToJsonProperty(itemType as any),
        }
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
      case TypeModels.InterfaceType:
        return {
          type: 'object',
          properties: this.fieldsToProperties(
            this.typeTree.getFieldsOf(type.id),
          ),
        } as any // cast is needed, because we can't verify at compile time that the interface matches the data

      case TypeModels.LambdaType:
        return {
          type: 'string',
          uniforms: {
            component: SelectLambda,
          },
        }

      case TypeModels.ElementType:
        return {
          type: 'string',
          uniforms: {
            component: getSelectElementComponent(type.kind),
          },
        }
      case TypeModels.ComponentType:
        return {
          type: 'string',
          uniforms: {
            component: SelectComponent,
          },
        }
      default:
        throw new Error('Type not recognized ' + (type as any).__typename)
    }
  }

  fieldsToProperties(fields: Array<__FieldFragment>) {
    const properties: PropertiesSchema<any> = {}

    for (const field of fields) {
      const type = this.typeTree.getFieldType(field.id)

      if (type) {
        properties[field.key] = {
          // todo cast
          ...(this.typeToJsonProperty(type as any) as any),
          label: field.name,
        }
      }
    }

    return properties
  }
}
