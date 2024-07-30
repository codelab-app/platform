import type {
  IRendererService,
  IRuntimeComponentService,
  IRuntimeElementService,
} from '@codelab/frontend/abstract/application'
import {
  RendererApplicationService,
  RuntimeComponentService,
  RuntimeElementService,
} from '@codelab/frontend-application-renderer/services'
import { Model, model, prop } from 'mobx-keystone'

export const createApplicationStore = () => {
  @model('@codelab/ApplicationIStore')
  class ApplicationStore extends Model({
    rendererService: prop<IRendererService>(
      () => new RendererApplicationService({}),
    ),
    runtimeComponentService: prop<IRuntimeComponentService>(
      () => new RuntimeComponentService({}),
    ),
    runtimeElementService: prop<IRuntimeElementService>(
      () => new RuntimeElementService({}),
    ),
  }) {}

  return new ApplicationStore({})
}
