import type { IBaseRenderPipe } from '@codelab/frontend/abstract/core'
import {
  getComponentService,
  getElementService,
  getRenderService,
} from '@codelab/frontend/abstract/core'
import { computed } from 'mobx'
import { idProp, Model, model } from 'mobx-keystone'

@model('@codelab/BaseRenderPipe')
export class BaseRenderPipe
  extends Model({
    id: idProp,
  })
  implements IBaseRenderPipe
{
  @computed
  get elementService() {
    return getElementService(this)
  }

  @computed
  get componentService() {
    return getComponentService(this)
  }

  @computed
  get renderService() {
    return getRenderService(this)
  }

  /**
   * The RenderService is the one that contains these pipes
   */
  @computed
  get renderer() {
    const renderer = this.renderService.activeRenderer?.current

    if (!renderer) {
      throw new Error('Unable to find active renderer')
    }

    return renderer
  }
}
