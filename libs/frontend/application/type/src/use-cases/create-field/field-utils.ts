import type { ITypeDomainService } from '@codelab/frontend-abstract-domain'
import type { IValidationRules } from '@codelab/shared-abstract-core'
import type { Maybe, Nullish } from '@codelab/shared-abstract-types'

import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { pick } from 'remeda'

type FieldCondition = (
  typeDomainService: ITypeDomainService,
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
    ? pick(rules, [primitiveKind as keyof IValidationRules])
    : {}

  return { general, ...rest }
}

export const isPrimitive: FieldCondition = (typeDomainService, fieldType) =>
  Boolean(
    fieldType &&
      typeDomainService.types.has(fieldType) &&
      typeDomainService.type(fieldType).kind === ITypeKind.PrimitiveType,
  )

export const isString: FieldCondition = (typeDomainService, fieldType) =>
  Boolean(
    fieldType &&
      typeDomainService.types.has(fieldType) &&
      typeDomainService.primitiveKind(fieldType) === IPrimitiveTypeKind.String,
  )

export const isInteger: FieldCondition = (typeDomainService, fieldType) =>
  Boolean(
    fieldType &&
      typeDomainService.types.has(fieldType) &&
      typeDomainService.primitiveKind(fieldType) === IPrimitiveTypeKind.Integer,
  )

export const canSetDefaultValue: FieldCondition = (
  typeDomainService,
  fieldType,
) => {
  return Boolean(
    fieldType &&
      typeDomainService.types.has(fieldType) &&
      typeDomainService.type(fieldType).kind !== ITypeKind.InterfaceType &&
      typeDomainService.type(fieldType).kind !== ITypeKind.ReactNodeType &&
      typeDomainService.type(fieldType).kind !== ITypeKind.ActionType,
  )
}

export const isFloat: FieldCondition = (typeDomainService, fieldType) =>
  Boolean(
    fieldType &&
      typeDomainService.types.has(fieldType) &&
      typeDomainService.primitiveKind(fieldType) === IPrimitiveTypeKind.Number,
  )

export const isBoolean: FieldCondition = (typeDomainService, fieldType) =>
  Boolean(
    fieldType &&
      typeDomainService.types.has(fieldType) &&
      typeDomainService.primitiveKind(fieldType) === IPrimitiveTypeKind.Boolean,
  )
