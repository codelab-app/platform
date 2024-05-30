import type { IValidationService } from '@codelab/shared/abstract/core'
import {
  ActionTypeSchema,
  EnumTypeSchema,
  IActionType,
  IEnumType,
  InterfaceTypeSchema,
  SchemaKinds,
} from '@codelab/shared/abstract/core'
import { ValidationService } from '../services/validation.service'

export const interfaceTypeValidation: IValidationService<
  typeof InterfaceTypeSchema
> = new ValidationService(SchemaKinds.InterfaceType, InterfaceTypeSchema)

export const enumTypeValidation: IValidationService<typeof EnumTypeSchema> =
  new ValidationService(SchemaKinds.EnumType, EnumTypeSchema)

export const actionTypeValidation: IValidationService<typeof ActionTypeSchema> =
  new ValidationService(SchemaKinds.ActionType, ActionTypeSchema)
