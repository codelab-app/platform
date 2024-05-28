import {
  IProp,
  type IValidationService,
  SchemaKinds,
} from '@codelab/shared/abstract/core'
import { ValidationService } from '../services/validation.service'

export const propValidation: IValidationService<IProp> = new ValidationService(
  SchemaKinds.Prop,
  IProp,
)
