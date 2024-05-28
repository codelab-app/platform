import {
  IInterfaceType,
  IInterfaceTypeDto,
  type IValidationService,
  SchemaKinds,
} from '@codelab/shared/abstract/core'
import { ValidationService } from '../services/validation.service'

export const interfaceTypeValidation: IValidationService<IInterfaceType> =
  new ValidationService(SchemaKinds.InterfaceType, IInterfaceType)
