import { IBaseRenderPipe } from '@codelab/shared/abstract/core'
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
  get renderService() {
    return findParent(this, (parent: any) => {
      return parent?.$modelType === '@codelab/RenderService'
    })
  }
}
