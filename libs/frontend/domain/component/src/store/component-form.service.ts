import type { IEntityFormService } from '@codelab/frontend/abstract/core'
import { InlineFormService } from '@codelab/frontend/shared/utils'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/ComponentFormService')
export class ComponentFormService
  extends ExtendedModel(modelClass<InlineFormService>(InlineFormService), {})
  implements IEntityFormService {}
