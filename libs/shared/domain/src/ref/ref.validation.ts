import {
  IRef,
  type IValidationService,
  SchemaKinds,
} from '@codelab/shared/abstract/core'
import { Typebox } from '@codelab/shared/abstract/typebox'
import { schemaProvider } from '@codelab/shared/infra/schema'
import { ValidationService } from '../services/validation.service'

export const refValidation: IValidationService<typeof Typebox.Ref> =
  new ValidationService(SchemaKinds.Ref, Typebox.Ref)
