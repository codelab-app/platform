import type { IValidationService } from '@codelab/shared/abstract/core'
import {
  ActionTypeSchema,
  EnumTypeSchema,
  IActionType,
  IEnumType,
  InterfaceTypeSchema,
  SchemaKinds,
} from '@codelab/shared/abstract/core'
import { Type } from '@sinclair/typebox'
import { ValidationService } from '../services/validation.service'

export const interfaceTypeValidation: IValidationService<
  typeof InterfaceTypeSchema
> = new ValidationService(SchemaKinds.InterfaceType, InterfaceTypeSchema)

const enumTypeSchema = Type.Pick(EnumTypeSchema, ['id', 'name'])

export const enumTypeValidation: IValidationService<typeof enumTypeSchema> =
  new ValidationService(SchemaKinds.EnumType, enumTypeSchema)

export const actionTypeValidation: IValidationService<typeof ActionTypeSchema> =
  new ValidationService(SchemaKinds.ActionType, ActionTypeSchema)
