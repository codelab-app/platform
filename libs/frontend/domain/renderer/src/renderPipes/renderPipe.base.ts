import { IBaseRenderPipe, IRenderer } from '@codelab/frontend/abstract/core'
import { getComponentService } from '@codelab/frontend/domain/component'
import { getElementService } from '@codelab/frontend/domain/element'
import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import {
  AnyModel,
  findParent,
  idProp,
  Model,
  model,
  modelTypeKey,
} from 'mobx-keystone'

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

  /**
   * The RenderService is the one that contains these pipes
   */
  @computed
  get renderer() {
    return throwIfUndefined(
      findParent<IRenderer>(this, (parent) => {
        return (parent as AnyModel)[modelTypeKey] === '@codelab/Renderer'
      }),
    )
  }
}
