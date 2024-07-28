import type { IToggleService } from '@codelab/frontend/abstract/application'
import { InlineFormService } from '@codelab/frontend-application-shared-store/ui'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/ComponentFormService')
export class ComponentFormService
  extends ExtendedModel(modelClass<InlineFormService>(InlineFormService), {})
  implements IToggleService {}
