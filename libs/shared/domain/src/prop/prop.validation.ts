import {
  type IValidationService,
  PropSchema,
} from '@codelab/shared/abstract/core'
import { IProp, SchemaKinds } from '@codelab/shared/abstract/core'
import { ValidationService } from '../services/validation.service'

export const propValidation: IValidationService<typeof PropSchema> =
  new ValidationService(SchemaKinds.Prop, PropSchema)
