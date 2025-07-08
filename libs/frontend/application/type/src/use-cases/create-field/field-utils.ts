import type { ITypeDomainService } from '@codelab/frontend-abstract-domain'
import type { IRef, IValidationRules } from '@codelab/shared-abstract-core'
import type { Maybe, Nullish } from '@codelab/shared-abstract-types'

import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { pick } from 'remeda'

type FieldCondition = (
  typeDomainService: ITypeDomainService,
  fieldType: Maybe<IRef>,
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
    fieldType?.id &&
      typeDomainService.types.has(fieldType.id) &&
      typeDomainService.type(fieldType.id).kind === ITypeKind.PrimitiveType,
  )

export const isString: FieldCondition = (typeDomainService, fieldType) =>
  Boolean(
    fieldType?.id &&
      typeDomainService.types.has(fieldType.id) &&
      typeDomainService.primitiveKind(fieldType.id) ===
        IPrimitiveTypeKind.String,
  )

export const isInteger: FieldCondition = (typeDomainService, fieldType) =>
  Boolean(
    fieldType?.id &&
      typeDomainService.types.has(fieldType.id) &&
      typeDomainService.primitiveKind(fieldType.id) ===
        IPrimitiveTypeKind.Integer,
  )

export const canSetDefaultValue: FieldCondition = (
  typeDomainService,
  fieldType,
) => {
  return Boolean(
    fieldType?.id &&
      typeDomainService.types.has(fieldType.id) &&
      typeDomainService.type(fieldType.id).kind !== ITypeKind.InterfaceType &&
      typeDomainService.type(fieldType.id).kind !== ITypeKind.ReactNodeType &&
      typeDomainService.type(fieldType.id).kind !== ITypeKind.ActionType,
  )
}

export const isFloat: FieldCondition = (typeDomainService, fieldType) =>
  Boolean(
    fieldType?.id &&
      typeDomainService.types.has(fieldType.id) &&
      typeDomainService.primitiveKind(fieldType.id) ===
        IPrimitiveTypeKind.Number,
  )

export const isBoolean: FieldCondition = (typeDomainService, fieldType) =>
  Boolean(
    fieldType?.id &&
      typeDomainService.types.has(fieldType.id) &&
      typeDomainService.primitiveKind(fieldType.id) ===
        IPrimitiveTypeKind.Boolean,
  )
