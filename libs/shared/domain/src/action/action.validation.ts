import type { IAction, IValidationService } from '@codelab/shared/abstract/core'
import { ValidationService } from '../services/validation.service'

export const actionValidation: IValidationService<IAction> =
  new ValidationService()
