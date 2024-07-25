import type { IRendererService } from '@codelab/frontend/abstract/application'
import { RendererApplicationService } from '@codelab/frontend-application-renderer/services'
import { Model, model, prop } from 'mobx-keystone'

export const createApplicationStore = () => {
  @model('@codelab/ApplicationIStore')
  class ApplicationStore extends Model({
    rendererService: prop<IRendererService>(
      () => new RendererApplicationService({}),
    ),
  }) {}

  return new ApplicationStore({})
}
