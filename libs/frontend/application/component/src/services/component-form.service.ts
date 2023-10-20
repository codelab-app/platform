import type { IFormService } from '@codelab/frontend/abstract/application'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/ComponentFormService')
export class ComponentFormService
  extends ExtendedModel(modelClass<InlineFormService>(InlineFormService), {})
  implements IFormService {}
