import { getComponentService } from '@codelab/frontend/abstract/application'
import {
  getRendererDomainService,
  type IBaseRenderPipe,
} from '@codelab/frontend/abstract/domain'
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
    const renderer = this.rendererDomainService.activeRenderer?.current

    if (!renderer) {
      throw new Error('Unable to find active renderer')
    }

    return renderer
  }

  @computed
  protected get componentService() {
    return getComponentService(this)
  }

  @computed
  protected get rendererDomainService() {
    return getRendererDomainService(this)
  }
}
