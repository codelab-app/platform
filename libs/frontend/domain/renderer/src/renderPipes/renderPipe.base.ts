import { IBaseRenderPipe, IRenderer } from '@codelab/frontend/abstract/core'
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
  /**
   * The RenderService is the one that contains these pipes
   */
  @computed
  get renderer() {
    return throwIfUndefined(
      findParent<IRenderer>(this, (parent) => {
        return (parent as AnyModel)?.[modelTypeKey] === '@codelab/Renderer'
      }),
    )
  }
}
