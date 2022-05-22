import { ElementTreeService } from '@codelab/frontend/modules/element'
import { IPage, IPageDTO } from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import { ExtendedModel, idProp, model, modelClass, prop } from 'mobx-keystone'

const hydrate = (page: IPageDTO) => {
  return new Page({
    id: page.id,
    name: page.name,
    rootElement: { id: page.rootElement.id },
    app: { id: page.app.id },
  })
}

@model('@codelab/Page')
export class Page
  extends ExtendedModel(modelClass(ElementTreeService), {
    id: idProp,
    app: prop<IEntity>(),
    name: prop<string>(),
    rootElement: prop<IEntity>(),
  })
  implements IPage
{
  static hydrate = hydrate
}
