import { IPreRender, IPreRenderDTO } from '@codelab/frontend/abstract/core'
import { IPreRenderType } from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import { detach, idProp, Model, model, prop, rootRef } from 'mobx-keystone'

const hydrate = (preRender: IPreRenderDTO) => {
  return new PreRender({
    id: preRender.id,
    code: preRender.code,
    name: preRender.name,
    page: preRender.page,
    type: preRender.type,
  })
}

@model('@codelab/PreRender')
export class PreRender
  extends Model(() => ({
    id: idProp,
    name: prop<string>(),
    code: prop<string>(),
    page: prop<IEntity>(),
    type: prop<IPreRenderType>(),
  }))
  implements IPreRender
{
  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  static hydrate = hydrate

  writeCache(fragment: IPreRenderDTO) {
    this.type = fragment.type
    this.code = fragment.code
    this.page = fragment.page
    this.name = fragment.name

    return this
  }
}

export const preRenderRef = rootRef<IPreRender>('@codelab/PreRenderRef', {
  onResolvedValueChange(ref, newPreRender, oldPreRender) {
    if (oldPreRender && !newPreRender) {
      detach(ref)
    }
  },
})
