import { IBaseRenderPipe, IRenderer } from '@codelab/frontend/abstract/core'
import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import { findParent, idProp, Model, model } from 'mobx-keystone'

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
      findParent<IRenderer>(this, (parent: any) => {
        return parent?.$modelType === '@codelab/Renderer'
      }),
    )
  }
}
