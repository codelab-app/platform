import { IPreRender, IPreRenderDTO } from '@codelab/frontend/abstract/core'
import { IPreRenderType } from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import { ExtendedModel, idProp, Model, model, prop } from 'mobx-keystone'

const hydrate = (preRender: IPreRenderDTO) => {
  return new PreRender({
    id: preRender.id,
    code: preRender.code,
    page: preRender.page,
    type: preRender.type,
  })
}

@model('@codelab/PreRender')
export class PreRender
  extends Model({
    id: idProp,
    code: prop<string>(),
    page: prop<IEntity>(),
    type: prop<IPreRenderType>(),
  })
  implements IPreRender
{
  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  static hydrate = hydrate

  writeCache(fragment: IPreRenderDTO) {
    this.type = fragment.type
    this.code = fragment.code
    this.page = fragment.page

    return this
  }
}
