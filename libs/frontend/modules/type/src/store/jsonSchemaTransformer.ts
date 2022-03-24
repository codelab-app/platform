import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen-v2'
import {
  IElementType,
  IReactNodeType,
  IRenderPropsType,
  IType,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { JSONSchema7 } from 'json-schema'
import {
  AnyType,
  AppType,
  ArrayType,
  ElementType,
  EnumType,
  Field,
  InterfaceType,
  LambdaType,
  MonacoType,
  PageType,
  PrimitiveType,
  ReactNodeType,
  RenderPropsType,
  UnionType,
} from './models'

export type JsonSchema = JSONSchema7 & { uniforms?: any; label?: string }

export interface TransformTypeOptions {
  /** Use this to add data to the property definitions for specific types  */
  extraProperties?: (type: IType) => JsonSchema
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

export class JsonSchemaTransformer {
  constructor(private readonly options?: TransformTypeOptions) {}

  transform(type: AnyType) {
    switch (type.typeKind) {
      case TypeKind.AppType:
        return this.fromAppType(type)
      case TypeKind.LambdaType:
        return this.fromLambdaType(type)
      case TypeKind.PageType:
        return this.fromPageType(type)
      case TypeKind.RenderPropsType:
        return this.fromRenderPropsType(type)
      case TypeKind.PrimitiveType:
        return this.fromPrimitiveType(type)
      case TypeKind.ReactNodeType:
        return this.fromReactNodeType(type)
      case TypeKind.MonacoType:
        return this.fromMonacoType(type)
      case TypeKind.ElementType:
        return this.fromElementType(type)
      case TypeKind.EnumType:
        return this.fromEnumType(type)
      case TypeKind.UnionType:
        return this.fromUnionType(type)
      case TypeKind.InterfaceType:
        return this.fromInterfaceType(type)
      case TypeKind.ArrayType:
        return this.fromArrayType(type)
    }
  }

  fromArrayType(type: ArrayType): JsonSchema {
    const extra = this.getExtraProperties(type)

    return {
      ...extra,
      type: 'array',
      items: type.itemType?.current
        ? this.transform(type.itemType?.current)
        : undefined,
    }
  }

  fromInterfaceType(type: InterfaceType): JsonSchema {
    const makeFieldSchema = (field: Field) => ({
      ...this.transform(field.type.current),
      label: field.name || pascalCaseToWords(field.key),
    })

    const makeFieldProperties = (
      acc: JsonSchema['properties'],
      field: Field,
    ) => {
      acc = acc || {}
      acc[field.key] = makeFieldSchema(field)

      return acc
    }

    const extra = this.getExtraProperties(type)

    return {
      ...extra,
      type: 'object',
      properties: type.fieldsArray.reduce(makeFieldProperties, {}),
    }
  }

  fromUnionType(type: UnionType): JsonSchema {
    // This is the extra for the union type. Not to be confused with the extra for the value type
    const extra = this.getExtraProperties(type)
    const label: string | undefined = extra?.label
    const labelWithQuotes = label ? `"${label}" ` : ''
    const typeLabel = `${labelWithQuotes}Type`

    return {
      ...extra,
      oneOf: type.typesOfUnionType.map((innerType) => {
        const valueSchema = this.transform(innerType.current)

        const properties = JsonSchemaTransformer.schemaForTypedValue(
          innerType.id,
          valueSchema,
          typeLabel,
        )

        return {
          type: 'object',
          label: '',
          typeName: innerType.current.name, // We use this as label of the select field item
          properties,
        }
      }),
    }
  }

  fromAppType(type: AppType): JsonSchema {
    return this.simpleReferenceType(type)
  }

  fromPageType(type: PageType): JsonSchema {
    return this.simpleReferenceType(type)
  }

  fromRenderPropsType(type: RenderPropsType): JsonSchema {
    return this.transformReactElementType(type)
  }

  fromMonacoType(type: MonacoType): JsonSchema {
    return this.simpleReferenceType(type)
  }

  fromLambdaType(type: LambdaType): JsonSchema {
    return this.simpleReferenceType(type)
  }

  fromReactNodeType(type: ReactNodeType): JsonSchema {
    return this.transformReactElementType(type)
  }

  fromElementType(type: ElementType): JsonSchema {
    return this.transformReactElementType(type)
  }

  fromPrimitiveType(type: PrimitiveType): JsonSchema {
    const extra = this.getExtraProperties(type)

    return { type: primitives[type.primitiveKind], ...extra }
  }

  fromEnumType(type: EnumType): JsonSchema {
    const extra = this.getExtraProperties(type)

    const uniforms = {
      options: type.allowedValues?.map((v) => ({ value: v.id, label: v.name })),
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
  private simpleReferenceType(type: AnyType): JsonSchema {
    const extra = this.getExtraProperties(type)

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
        enum: typeId ? [typeId] : undefined, // This ensures that only this exact type is considered valid. Allows union types to use oneOf
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

    const properties = JsonSchemaTransformer.schemaForTypedValue(
      type.id,
      { type: 'string', label: '', ...extra },
      '',
    )

    return { type: 'object', properties, uniforms: nullUniforms, label: '' }
  }

  private getExtraProperties(type: IType) {
    return this.options?.extraProperties?.(type) || undefined
  }
}
