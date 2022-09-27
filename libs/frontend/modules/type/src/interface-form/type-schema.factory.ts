import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import {
  IAnyActionType,
  IAnyType,
  IAppType,
  IArrayType,
  ICodeMirrorType,
  IElementType,
  IEnumType,
  IField,
  IInterfaceType,
  ILambdaType,
  IPageType,
  IPrimitiveType,
  IReactNodeType,
  IRenderPropsType,
  ITypeKind,
  IUnionType,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { JSONSchema7 } from 'json-schema'
import { UiPropertiesContext } from './types'

export type JsonSchema = JSONSchema7 & { uniforms?: any; label?: string }

export interface TransformTypeOptions {
  /** Use this to add data to the property definitions for specific types  */
  extraProperties?: (
    type: IAnyType,
    context?: UiPropertiesContext,
  ) => JsonSchema
}

// I'm not sure what the difference is, but I'm keeping it like it is for now
export const blankUniforms = { component: () => null }
export const nullUniforms = { component: null }

const primitives = {
  [PrimitiveTypeKind.String]: 'string' as const,
  [PrimitiveTypeKind.Integer]: 'integer' as const,
  [PrimitiveTypeKind.Float]: 'number' as const,
  [PrimitiveTypeKind.Boolean]: 'boolean' as const,
}

const primitivesDefaults = {
  [PrimitiveTypeKind.Boolean]: false,
  [PrimitiveTypeKind.Float]: 0.0,
  [PrimitiveTypeKind.Integer]: 0,
  [PrimitiveTypeKind.String]: '',
}

export class TypeSchemaFactory {
  constructor(private readonly options?: TransformTypeOptions) {}

  transform(type: IAnyType, context?: UiPropertiesContext) {
    switch (type.kind) {
      case ITypeKind.AppType:
        return this.fromAppType(type)
      case ITypeKind.ActionType:
        return this.fromActionType(type)
      case ITypeKind.LambdaType:
        return this.fromLambdaType(type)
      case ITypeKind.PageType:
        return this.fromPageType(type)
      case ITypeKind.RenderPropsType:
        return this.fromRenderPropsType(type)
      case ITypeKind.PrimitiveType:
        return this.fromPrimitiveType(type)
      case ITypeKind.ReactNodeType:
        return this.fromReactNodeType(type)
      case ITypeKind.CodeMirrorType:
        return this.fromCodeMirrorType(type, context)
      case ITypeKind.ElementType:
        return this.fromElementType(type)
      case ITypeKind.EnumType:
        return this.fromEnumType(type)
      case ITypeKind.UnionType:
        return this.fromUnionType(type)
      case ITypeKind.InterfaceType:
        return this.fromInterfaceType(type)
      case ITypeKind.ArrayType:
        return this.fromArrayType(type)
    }
  }

  fromArrayType(type: IArrayType): JsonSchema {
    const extra = this.getExtraProperties(type)

    return {
      ...extra,
      type: 'array',
      items: type.itemType?.current
        ? this.transform(type.itemType?.current)
        : undefined,
    }
  }

  fromInterfaceType(type: IInterfaceType): JsonSchema {
    const makeFieldSchema = (field: IField) => ({
      ...this.transform(field.type.current),
      ...JSON.parse(field.validationSchema || '{}'),
      label: field.name || pascalCaseToWords(field.key),
    })

    const makeFieldProperties = (
      acc: JsonSchema['properties'],
      field: IField,
    ) => {
      acc = acc || {}
      acc[field.key] = makeFieldSchema(field)

      return acc
    }

    const extra = this.getExtraProperties(type)

    return {
      ...extra,
      type: 'object',
      properties: [...type.fields.values()].reduce(makeFieldProperties, {}),
    }
  }

  fromUnionType(type: IUnionType): JsonSchema {
    // This is the extra for the union type. Not to be confused with the extra for the value type
    const extra = this.getExtraProperties(type)
    const label: string | undefined = extra?.label
    const labelWithQuotes = label ? `"${label}" ` : ''
    const typeLabel = `${labelWithQuotes}Type`

    return {
      ...extra,
      oneOf: type.typesOfUnionType.map((innerType) => {
        const valueSchema = this.transform(innerType.current)

        const properties = TypeSchemaFactory.schemaForTypedValue(
          innerType.id,
          valueSchema,
          typeLabel,
        )

        return {
          type: 'object',
          label: '',
          // We use this as label of the select field item
          typeName: innerType.current.name,
          properties,
        }
      }),
    }
  }

  fromAppType(type: IAppType): JsonSchema {
    return this.simpleReferenceType(type)
  }

  fromActionType(type: IAnyActionType): JsonSchema {
    return this.simpleReferenceType(type)
  }

  fromPageType(type: IPageType): JsonSchema {
    return this.simpleReferenceType(type)
  }

  fromRenderPropsType(type: IRenderPropsType): JsonSchema {
    return this.transformReactElementType(type)
  }

  fromCodeMirrorType(
    type: ICodeMirrorType,
    context?: UiPropertiesContext,
  ): JsonSchema {
    return this.simpleReferenceType(type, context)
  }

  fromLambdaType(type: ILambdaType): JsonSchema {
    return this.simpleReferenceType(type)
  }

  fromReactNodeType(type: IReactNodeType): JsonSchema {
    return this.transformReactElementType(type)
  }

  fromElementType(type: IElementType): JsonSchema {
    return this.transformReactElementType(type)
  }

  fromPrimitiveType(type: IPrimitiveType): JsonSchema {
    const extra = this.getExtraProperties(type)

    return {
      type: primitives[type.primitiveKind],
      ...extra,
      default: primitivesDefaults[type.primitiveKind],
    }
  }

  fromEnumType(type: IEnumType): JsonSchema {
    const extra = this.getExtraProperties(type)

    const uniforms = {
      options: type.allowedValues?.map((v) => ({
        value: v.id,
        label: v.name || v.value,
      })),
      showSearch: true,
      optionFilterProp: 'label',
      ...extra?.uniforms,
    }

    return {
      type: 'string',
      enum: type.allowedValues?.map((v) => v.id),
      uniforms,
      ...extra,
    } as const
  }

  /**
   * Handles the reference types without any extra properties
   * Produces a 'string' type
   */
  private simpleReferenceType(
    type: IAnyType,
    context?: UiPropertiesContext,
  ): JsonSchema {
    const extra = this.getExtraProperties(type, context)

    return { type: 'string', ...extra } as const
  }

  /**
   * Produces the properties with the shape of a {@link TypedValue}
   * with a `type` field that has a value of `typeId`
   */
  private static schemaForTypedValue(
    typeId: Maybe<string>,
    valueSchema: JsonSchema,
    typeLabel: Maybe<string>,
  ): { [key: string]: JsonSchema } {
    return {
      value: valueSchema as any,
      type: {
        type: 'string',
        uniforms: blankUniforms,
        label: typeLabel,
        default: typeId,
        // This ensures that only this exact type is considered valid. Allows union types to use oneOf
        enum: typeId ? [typeId] : undefined,
      },
    }
  }

  /**
   * Handles transformation of the React Element related types.
   * Produces a {@link TypedValue} shaped schema
   */
  private transformReactElementType(
    type: IElementType | IReactNodeType | IRenderPropsType,
  ): JsonSchema {
    const extra = this.getExtraProperties(type)

    const properties = TypeSchemaFactory.schemaForTypedValue(
      type.id,
      { type: 'string', label: '', ...extra },
      '',
    )

    return { type: 'object', properties, uniforms: nullUniforms, label: '' }
  }

  private getExtraProperties(type: IAnyType, context?: UiPropertiesContext) {
    return this.options?.extraProperties?.(type, context) || undefined
  }
}
