import type {
  IActionType,
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
  IType,
  IUnionType,
} from '@codelab/frontend/abstract/core'
import { fieldDescription } from '@codelab/frontend/view/components'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import type { JSONSchema7 } from 'json-schema'
import type { UiPropertiesContext } from './types'
import { getUiProperties } from './ui-properties'

export type JsonSchema = JSONSchema7 & { label?: string; uniforms?: object }

export interface TransformTypeOptions {
  /** Use this to add data to the property definitions for specific types  */
  extraProperties?(type: IType, context?: UiPropertiesContext): JsonSchema
}

// I'm not sure what the difference is, but I'm keeping it like it is for now
export const blankUniforms = { component: () => null }
export const nullUniforms = { component: null }

export const primitives = {
  [PrimitiveTypeKind.String]: 'string' as const,
  [PrimitiveTypeKind.Integer]: 'integer' as const,
  [PrimitiveTypeKind.Number]: 'number' as const,
  [PrimitiveTypeKind.Boolean]: 'boolean' as const,
}

export class TypeSchemaFactory {
  constructor(private readonly options?: TransformTypeOptions) {}

  transform(type: IType, context?: UiPropertiesContext) {
    switch (type.kind) {
      case ITypeKind.AppType:
        return this.fromAppType(type)
      case ITypeKind.ActionType:
        return this.fromActionType(type, context)
      case ITypeKind.LambdaType:
        return this.fromLambdaType(type)
      case ITypeKind.PageType:
        return this.fromPageType(type)
      case ITypeKind.RenderPropsType:
        return this.fromRenderPropsType(type, context)
      case ITypeKind.PrimitiveType:
        return this.fromPrimitiveType(type, context)
      case ITypeKind.ReactNodeType:
        return this.fromReactNodeType(type, context)
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
      items: type.itemType?.isValid
        ? this.transform(type.itemType.current)
        : {},
      type: 'array',
    }
  }

  fromInterfaceType(type: IInterfaceType): JsonSchema {
    const makeFieldSchema = (field: IField) => ({
      label: field.name || compoundCaseToTitleCase(field.key),
      ...(field.description ? fieldDescription(field.description) : {}),
      ...this.transform(field.type.current, {
        fieldName: field.name,
        validationRules: field.validationRules ?? undefined,
      }),
      ...field.validationRules?.general,
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
      properties: type.fields.reduce(makeFieldProperties, {}),
      required: type.fields
        .map((field) =>
          field.validationRules?.general?.nullable === false
            ? field.key
            : undefined,
        )
        .filter(Boolean) as Array<string>,
      type: 'object',
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
          label: '',
          properties,

          type: 'object',
          // We use this as label of the select field item
          typeName: innerType.current.name,
        }
      }),
    }
  }

  fromAppType(type: IAppType): JsonSchema {
    return this.simpleReferenceType(type)
  }

  fromActionType(type: IActionType, context?: UiPropertiesContext): JsonSchema {
    return this.transformTypedValueType(type, context)
  }

  fromPageType(type: IPageType): JsonSchema {
    return this.simpleReferenceType(type)
  }

  fromRenderPropsType(
    type: IRenderPropsType,
    context?: UiPropertiesContext,
  ): JsonSchema {
    return this.transformTypedValueType(type, context)
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

  fromReactNodeType(
    type: IReactNodeType,
    context?: UiPropertiesContext,
  ): JsonSchema {
    return this.transformTypedValueType(type, context)
  }

  fromElementType(type: IElementType): JsonSchema {
    const extra = this.getExtraProperties(type)

    const properties = TypeSchemaFactory.schemaForTypedValue(
      type.id,
      { label: '', type: 'string', ...extra },
      '',
    )

    return { properties, type: 'object', uniforms: nullUniforms }
  }

  fromPrimitiveType(
    type: IPrimitiveType,
    context?: UiPropertiesContext,
  ): JsonSchema {
    const extra = this.getExtraProperties(type)
    let rulesSchema = {}

    switch (type.primitiveKind) {
      case PrimitiveTypeKind.String:
        rulesSchema = {
          ...context?.validationRules?.String,
        }
        break
      case PrimitiveTypeKind.Number:
        rulesSchema = {
          ...context?.validationRules?.Number,
        }
        break
      case PrimitiveTypeKind.Integer:
        rulesSchema = {
          ...context?.validationRules?.Integer,
        }
        break
      case PrimitiveTypeKind.Boolean:
        rulesSchema = {
          default: false,
        }
        break
    }

    return {
      type: primitives[type.primitiveKind],
      ...rulesSchema,
      ...extra,
    }
  }

  fromEnumType(type: IEnumType): JsonSchema {
    const extra = this.getExtraProperties(type)

    return { type: 'string', ...extra } as const
  }

  /**
   * Handles the reference types without any extra properties
   * Produces a 'string' type
   */
  private simpleReferenceType(
    type: IType,
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
      type: {
        default: typeId,
        // This ensures that only this exact type is considered valid. Allows union types to use oneOf
        enum: typeId ? [typeId] : undefined,

        label: typeLabel,

        type: 'string',

        uniforms: blankUniforms,
      },
      value: valueSchema,
    }
  }

  /**
   * Handles transformation of the React Element related types.
   * Produces a {@link TypedValue} shaped schema
   */
  private transformTypedValueType(
    type: IActionType | IReactNodeType | IRenderPropsType,
    context?: UiPropertiesContext,
  ): JsonSchema {
    const extra = this.getExtraProperties(type)
    const label = context?.fieldName ?? ''

    const properties = TypeSchemaFactory.schemaForTypedValue(
      type.id,
      { label, ...extra },
      '',
    )

    return { label: '', properties, type: 'object', uniforms: nullUniforms }
  }

  private getExtraProperties(type: IType, context?: UiPropertiesContext) {
    return this.options?.extraProperties?.(type, context) || undefined
  }
}

export const schemaTransformer = new TypeSchemaFactory({
  extraProperties: getUiProperties,
})
