import type { IElementApplicationService } from '@codelab/frontend/abstract/application'
import { Model, model, prop } from 'mobx-keystone'
import { ElementApplicationValidationService } from './element.application.validation.service'

@model('@codelab/ElementApplicationService')
export class ElementApplicationService
  extends Model({
    validationService: prop(() => new ElementApplicationValidationService({})),
  })
  implements IElementApplicationService {}
