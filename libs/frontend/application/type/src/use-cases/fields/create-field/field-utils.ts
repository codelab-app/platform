import type {
  ITypeService,
  IValidationRules,
} from '@codelab/frontend/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { Maybe, Nullish } from '@codelab/shared/abstract/types'
import pick from 'lodash/pick'

type FieldCondition = (
  typeService: ITypeService,
  fieldTypeId: Maybe<string>,
) => boolean

export const filterValidationRules = (
  rules: Nullish<IValidationRules>,
  primitiveKind: Nullish<Omit<IPrimitiveTypeKind, 'Boolean'>>,
) => {
  if (!rules) {
    return {}
  }

  const { general } = rules

  const rest = primitiveKind
    ? pick(rules, primitiveKind as keyof typeof rules)
    : {}

  return { general, ...rest }
}

export const isPrimitive: FieldCondition = (typeService, fieldType) =>
  Boolean(
    fieldType && typeService.type(fieldType)?.kind === ITypeKind.PrimitiveType,
  )

export const isString: FieldCondition = (typeService, fieldType) =>
  Boolean(
    fieldType &&
      typeService.primitiveKind(fieldType) === IPrimitiveTypeKind.String,
  )

export const isInteger: FieldCondition = (typeService, fieldType) =>
  Boolean(
    fieldType &&
      typeService.primitiveKind(fieldType) === IPrimitiveTypeKind.Integer,
  )

export const canSetDefaultValue: FieldCondition = (typeService, fieldType) =>
  Boolean(
    fieldType &&
      typeService.type(fieldType)?.kind !== ITypeKind.InterfaceType &&
      typeService.type(fieldType)?.kind !== ITypeKind.ReactNodeType,
  )

export const isFloat: FieldCondition = (typeService, fieldType) =>
  Boolean(
    fieldType &&
      typeService.primitiveKind(fieldType) === IPrimitiveTypeKind.Number,
  )

export const isBoolean: FieldCondition = (typeService, fieldType) =>
  Boolean(
    fieldType &&
      typeService.primitiveKind(fieldType) === IPrimitiveTypeKind.Boolean,
  )
