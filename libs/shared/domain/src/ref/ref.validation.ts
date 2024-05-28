import {
  IRef,
  type IValidationService,
  SchemaKinds,
} from '@codelab/shared/abstract/core'
import { schemaProvider } from '@codelab/shared/infra/schema'
import { ValidationService } from '../services/validation.service'

export const refValidation: IValidationService<IRef> = new ValidationService(
  SchemaKinds.Ref,
  IRef,
)
