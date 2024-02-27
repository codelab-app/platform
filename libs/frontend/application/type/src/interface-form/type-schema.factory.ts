import type {
  IActionTypeModel,
  IAppTypeModel,
  IArrayTypeModel,
  ICodeMirrorTypeModel,
  IElementTypeModel,
  IEnumType,
  IFieldModel,
  IInterfaceTypeModel,
  ILambdaTypeModel,
  IPageTypeModel,
  IPrimitiveTypeModel,
  IReactNodeTypeModel,
  IRenderPropTypeModel,
  ITypeModel,
  IUnionTypeModel,
} from '@codelab/frontend/abstract/domain'
import { fieldDescription } from '@codelab/frontend/presentation/view'
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
  extraProperties?(type: ITypeModel, context?: UiPropertiesContext): JsonSchema
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

  transform(type: ITypeModel, context?: UiPropertiesContext) {
    switch (type.kind) {
      case ITypeKind.AppType:
        return this.fromAppType(type, context)
      case ITypeKind.ActionType:
        return this.fromActionType(type, context)
      case ITypeKind.LambdaType:
        return this.fromLambdaType(type, context)
      case ITypeKind.PageType:
        return this.fromPageType(type, context)
      case ITypeKind.RenderPropType:
        return this.fromRenderPropType(type, context)
      case ITypeKind.PrimitiveType:
        return this.fromPrimitiveType(type, context)
      case ITypeKind.ReactNodeType:
        return this.fromReactNodeType(type, context)
      case ITypeKind.CodeMirrorType:
        return this.fromCodeMirrorType(type, context)
      case ITypeKind.ElementType:
        return this.fromElementType(type, context)
      case ITypeKind.EnumType:
        return this.fromEnumType(type, context)
      case ITypeKind.UnionType:
        return this.fromUnionType(type, context)
      case ITypeKind.InterfaceType:
        return this.fromInterfaceType(type, context)
      case ITypeKind.ArrayType:
        return this.fromArrayType(type, context)
    }
  }

  /**
   * Produces the properties with the shape of a {@link TypedProp}
   * with a `type` field that has a value of `typeId`
   */
  private static schemaForTypedProp(
    type: Maybe<ITypeModel>,
    valueSchema: JsonSchema,
    typeLabel: Maybe<string>,
  ): { [key: string]: JsonSchema } {
    return {
      kind: {
        default: type?.kind,

        enum: type?.kind ? [type.kind] : undefined,

        label: `${typeLabel}Kind`,

        type: 'string',

        uniforms: blankUniforms,
      },
      type: {
        default: type?.id,
        // This ensures that only this exact type is considered valid. Allows union types to use oneOf
        enum: type?.id ? [type.id] : undefined,

        label: typeLabel,

        type: 'string',

        uniforms: blankUniforms,
      },
      value: valueSchema,
    }
  }

  private fromActionType(
    type: IActionTypeModel,
    context?: UiPropertiesContext,
  ): JsonSchema {
    return this.transformTypedPropType(type, context)
  }

  private fromAppType(
    type: IAppTypeModel,
    context?: UiPropertiesContext,
  ): JsonSchema {
    return this.simpleReferenceType(type, context)
  }

  private fromArrayType(
    type: IArrayTypeModel,
    context?: UiPropertiesContext,
  ): JsonSchema {
    const extra = this.getExtraProperties(type, context)

    return {
      ...extra,
      items: type.itemType?.isValid
        ? this.transform(type.itemType.current)
        : {},
      type: 'array',
    }
  }

  private fromCodeMirrorType(
    type: ICodeMirrorTypeModel,
    context?: UiPropertiesContext,
  ): JsonSchema {
    return this.simpleReferenceType(type, context)
  }

  private fromElementType(
    type: IElementTypeModel,
    context?: UiPropertiesContext,
  ): JsonSchema {
    const extra = this.getExtraProperties(type, context)

    const properties = TypeSchemaFactory.schemaForTypedProp(
      type,
      { label: '', type: 'string', ...extra },
      '',
    )

    return { properties, type: 'object', uniforms: nullUniforms }
  }

  private fromEnumType(
    type: IEnumType,
    context?: UiPropertiesContext,
  ): JsonSchema {
    const extra = this.getExtraProperties(type, context)

    return {
      default: context?.defaultValues || undefined,
      type: 'string',
      ...extra,
    } as const
  }

  private fromInterfaceType(
    type: IInterfaceTypeModel,
    context?: UiPropertiesContext,
  ): JsonSchema {
    const makeFieldSchema = (field: IFieldModel) => {
      return {
        label: field.name || compoundCaseToTitleCase(field.key),
        ...(field.description ? fieldDescription(field.description) : {}),
        ...this.transform(field.type.current, {
          autocomplete: context?.autocomplete,
          defaultValues: field.defaultValues,
          fieldName: field.name,
          validationRules: field.validationRules ?? undefined,
        }),
        ...(field.type.current.kind !== ITypeKind.UnionType
          ? field.validationRules?.general
          : undefined),
      }
    }

    const makeFieldProperties = (
      acc: JsonSchema['properties'],
      field: IFieldModel,
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

  private fromLambdaType(
    type: ILambdaTypeModel,
    context?: UiPropertiesContext,
  ): JsonSchema {
    return this.simpleReferenceType(type, context)
  }

  private fromPageType(
    type: IPageTypeModel,
    context?: UiPropertiesContext,
  ): JsonSchema {
    return this.simpleReferenceType(type, context)
  }

  private fromPrimitiveType(
    type: IPrimitiveTypeModel,
    context?: UiPropertiesContext,
  ): JsonSchema {
    const extra = this.getExtraProperties(type, context)
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
          default:
            typeof context?.defaultValues === 'boolean'
              ? context.defaultValues
              : false,
        }

        break
    }

    if (
      context?.defaultValues &&
      type.primitiveKind !== PrimitiveTypeKind.Boolean
    ) {
      rulesSchema = {
        ...rulesSchema,
        default: context.defaultValues,
      }
    }

    return {
      type: primitives[type.primitiveKind],
      ...rulesSchema,
      ...extra,
    }
  }

  private fromReactNodeType(
    type: IReactNodeTypeModel,
    context?: UiPropertiesContext,
  ): JsonSchema {
    return this.transformTypedPropType(type, context)
  }

  private fromRenderPropType(
    type: IRenderPropTypeModel,
    context?: UiPropertiesContext,
  ): JsonSchema {
    return this.transformTypedPropType(type, context)
  }

  private fromUnionType(
    type: IUnionTypeModel,
    context?: UiPropertiesContext,
  ): JsonSchema {
    // This is the extra for the union type. Not to be confused with the extra for the value type
    const extra = this.getExtraProperties(type, context)
    const label: string | undefined = extra?.label
    const labelWithQuotes = label ? `"${label}" ` : ''
    const typeLabel = `${labelWithQuotes}Type`

    return {
      ...extra,
      oneOf: type.typesOfUnionType.map((innerType) => {
        const valueSchema = this.transform(innerType.current)

        const properties = TypeSchemaFactory.schemaForTypedProp(
          innerType.current,
          valueSchema,
          typeLabel,
        )

        return {
          label: '',
          properties,
          ...context?.validationRules?.general,
          required: ['type'],
          type: 'object',
          // We use this as label of the select field item
          typeName: innerType.current.name,
        }
      }),
    }
  }

  private getExtraProperties(type: ITypeModel, context?: UiPropertiesContext) {
    return this.options?.extraProperties?.(type, context) || undefined
  }

  /**
   * Handles the reference types without any extra properties
   * Produces a 'string' type
   */
  private simpleReferenceType(
    type: ITypeModel,
    context?: UiPropertiesContext,
  ): JsonSchema {
    const extra = this.getExtraProperties(type, context)

    return { type: 'string', ...extra } as const
  }

  /**
   * Handles transformation of the React Element related types.
   * Produces a {@link TypedProp} shaped schema
   */
  private transformTypedPropType(
    type: IActionTypeModel | IReactNodeTypeModel | IRenderPropTypeModel,
    context?: UiPropertiesContext,
  ): JsonSchema {
    const extra = this.getExtraProperties(type, context)
    const label = context?.fieldName ?? ''

    const properties = TypeSchemaFactory.schemaForTypedProp(
      type,
      { label, ...extra },
      '',
    )

    return {
      label: '',
      properties,
      required: ['type', 'kind'],
      type: 'object',
      uniforms: nullUniforms,
    }
  }
}

export const schemaTransformer = new TypeSchemaFactory({
  extraProperties: getUiProperties,
})
