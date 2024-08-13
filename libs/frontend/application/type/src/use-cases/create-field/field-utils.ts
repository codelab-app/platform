import type { ITypeDomainService } from '@codelab/frontend/abstract/domain'
import type { IValidationRules } from '@codelab/shared/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { Maybe, Nullish } from '@codelab/shared/abstract/types'
import pick from 'lodash/pick'

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
    ? pick(rules, primitiveKind as keyof typeof rules)
    : {}

  return { general, ...rest }
}

export const isPrimitive: FieldCondition = (typeDomainService, fieldType) =>
  Boolean(
    fieldType &&
      typeDomainService.getType(fieldType)?.kind === ITypeKind.PrimitiveType,
  )

export const isString: FieldCondition = (typeDomainService, fieldType) =>
  Boolean(
    fieldType &&
      typeDomainService.primitiveKind(fieldType) === IPrimitiveTypeKind.String,
  )

export const isInteger: FieldCondition = (typeDomainService, fieldType) =>
  Boolean(
    fieldType &&
      typeDomainService.primitiveKind(fieldType) === IPrimitiveTypeKind.Integer,
  )

export const canSetDefaultValue: FieldCondition = (
  typeDomainService,
  fieldType,
) =>
  Boolean(
    fieldType &&
      typeDomainService.getType(fieldType)?.kind !== ITypeKind.InterfaceType &&
      typeDomainService.getType(fieldType)?.kind !== ITypeKind.ReactNodeType,
  )

export const isFloat: FieldCondition = (typeDomainService, fieldType) =>
  Boolean(
    fieldType &&
      typeDomainService.primitiveKind(fieldType) === IPrimitiveTypeKind.Number,
  )

export const isBoolean: FieldCondition = (typeDomainService, fieldType) =>
  Boolean(
    fieldType &&
      typeDomainService.primitiveKind(fieldType) === IPrimitiveTypeKind.Boolean,
  )
