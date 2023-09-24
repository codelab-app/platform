import type { IBaseRenderPipe } from '@codelab/frontend/abstract/application'
import { getRendererService } from '@codelab/frontend/abstract/application'
import { getComponentDomainService } from '@codelab/frontend/abstract/domain'
import { computed } from 'mobx'
import { idProp, Model, model } from 'mobx-keystone'

@model('@codelab/BaseRenderPipe')
export class BaseRenderPipe
  extends Model({
    id: idProp,
  })
  implements IBaseRenderPipe
{
  /**
   * The RenderService is the one that contains these pipes
   */
  @computed
  get renderer() {
    const renderer = this.rendererService.activeRenderer?.current

    if (!renderer) {
      throw new Error('Unable to find active renderer')
    }

    return renderer
  }

  // Used by inherited classes
  @computed
  protected get componentService() {
    return getComponentService(this)
  }

  @computed
  protected get componentDomainService() {
    return getComponentDomainService(this)
  }

  @computed
  protected get rendererService() {
    return getRendererService(this)
  }
}
